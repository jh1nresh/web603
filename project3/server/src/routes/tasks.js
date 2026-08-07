import { Router } from 'express'
import Task, { PRIORITIES } from '../models/Task.js'
import { asyncHandler, httpError } from '../middleware/errors.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Everything below this line requires a valid auth cookie.
router.use(requireAuth)

function validateTask({ title, description, priority }, { partial = false } = {}) {
  const errors = {}

  if (!partial || title !== undefined) {
    if (!title?.trim()) errors.title = 'Title is required'
    else if (title.trim().length > 120) errors.title = 'Title must be 120 characters or fewer'
  }
  if (description !== undefined && description.length > 500) {
    errors.description = 'Description must be 500 characters or fewer'
  }
  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    errors.priority = 'Priority must be high, medium, or low'
  }
  return errors
}

// GET /api/tasks?status=all|active|done
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { status = 'all' } = req.query

    const filter = { user: req.user._id }
    if (status === 'active') filter.completed = false
    if (status === 'done') filter.completed = true

    // High priority first, then newest.
    const order = { high: 0, medium: 1, low: 2 }
    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    tasks.sort((a, b) => order[a.priority] - order[b.priority])

    const all = await Task.find({ user: req.user._id }).select('completed')
    const done = all.filter((t) => t.completed).length

    res.json({
      tasks: tasks.map((t) => t.toPublic()),
      stats: { total: all.length, done, active: all.length - done },
    })
  })
)

// POST /api/tasks
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, description = '', priority = 'medium' } = req.body
    const errors = validateTask({ title, description, priority })
    if (Object.keys(errors).length) throw httpError(400, 'Validation failed', errors)

    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description.trim(),
      priority,
    })

    res.status(201).json({ task: task.toPublic() })
  })
)

// PUT /api/tasks/:id
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { title, description, priority, completed } = req.body
    const errors = validateTask({ title, description, priority }, { partial: true })
    if (Object.keys(errors).length) throw httpError(400, 'Validation failed', errors)

    // Scoping the query by user is what stops one account editing another's task.
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) throw httpError(404, 'Task not found')

    if (title !== undefined) task.title = title.trim()
    if (description !== undefined) task.description = description.trim()
    if (priority !== undefined) task.priority = priority
    if (completed !== undefined) task.completed = Boolean(completed)

    await task.save()
    res.json({ task: task.toPublic() })
  })
)

// DELETE /api/tasks/:id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!task) throw httpError(404, 'Task not found')
    res.json({ message: 'Task deleted', id: req.params.id })
  })
)

export default router
