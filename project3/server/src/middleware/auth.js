import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const TOKEN_COOKIE = 'taskflow_token'

export function signToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

// HTTP-only so client-side JavaScript can never read the token (XSS defence).
export function sendTokenCookie(res, token) {
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // requires HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

export function clearTokenCookie(res) {
  res.clearCookie(TOKEN_COOKIE, { path: '/' })
}

// Gate for every protected route: verify the cookie, then load the user.
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[TOKEN_COOKIE]
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.sub)
    if (!user) {
      clearTokenCookie(res)
      return res.status(401).json({ message: 'Not authenticated' })
    }

    // Server-side session is kept in step with the token.
    if (req.session) req.session.userId = user._id.toString()

    req.user = user
    next()
  } catch {
    clearTokenCookie(res)
    return res.status(401).json({ message: 'Session expired, please log in again' })
  }
}
