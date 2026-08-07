import { Router } from 'express'
import User from '../models/User.js'
import { asyncHandler, httpError } from '../middleware/errors.js'
import {
  requireAuth,
  signToken,
  sendTokenCookie,
  clearTokenCookie,
} from '../middleware/auth.js'

const router = Router()

// Server-side validation runs before Mongoose so the messages are friendly and
// the client never has to trust its own checks.
function validateSignup({ name, email, password, confirmPassword }) {
  const errors = {}
  if (!name?.trim()) errors.name = 'Name is required'
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters'

  if (!email?.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address'

  if (!password) errors.password = 'Password is required'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters'

  if (confirmPassword !== undefined && confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}

// POST /api/auth/signup
router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = validateSignup({ name, email, password, confirmPassword })
    if (Object.keys(errors).length) throw httpError(400, 'Validation failed', errors)

    const existing = await User.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      throw httpError(409, 'Validation failed', { email: 'That email is already registered' })
    }

    const user = await User.create({ name: name.trim(), email, password })

    const token = signToken(user)
    sendTokenCookie(res, token)
    req.session.userId = user._id.toString()

    res.status(201).json({ user: user.toPublic() })
  })
)

// POST /api/auth/login
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const errors = {}
    if (!email?.trim()) errors.email = 'Email is required'
    if (!password) errors.password = 'Password is required'
    if (Object.keys(errors).length) throw httpError(400, 'Validation failed', errors)

    // `password` is select:false on the schema, so ask for it explicitly.
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')

    // Same message either way — don't reveal which emails exist.
    if (!user || !(await user.comparePassword(password))) {
      throw httpError(401, 'Email or password is incorrect')
    }

    const token = signToken(user)
    sendTokenCookie(res, token)
    req.session.userId = user._id.toString()

    res.json({ user: user.toPublic() })
  })
)

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  clearTokenCookie(res)
  req.session?.destroy(() => {
    res.clearCookie('taskflow_sid', { path: '/' })
    res.json({ message: 'Logged out' })
  })
})

// GET /api/auth/me — lets the SPA restore its session on a page refresh.
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user.toPublic() })
})

export default router
