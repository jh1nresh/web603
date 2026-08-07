import { useState } from 'react'

const EMPTY = { title: '', description: '', priority: 'medium' }

export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  // Client-side validation first; the server repeats every one of these checks.
  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Title is required'
    else if (form.title.trim().length > 120) next.title = 'Title must be 120 characters or fewer'
    if (form.description.length > 500) {
      next.description = 'Description must be 500 characters or fewer'
    }
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const clientErrors = validate()
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length) return

    setSubmitting(true)
    try {
      await onCreate(form)
      setForm(EMPTY)
      setErrors({})
    } catch (err) {
      setErrors(err.errors && Object.keys(err.errors).length ? err.errors : { form: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit} noValidate>
      <div className="card-header">+ New Task</div>
      <div className="card-body">
        {errors.form && <div className="alert alert-danger py-2">{errors.form}</div>}

        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title <span className="text-danger">*</span>
          </label>
          <input
            id="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            value={form.title}
            onChange={update('title')}
            placeholder="What needs to be done?"
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            value={form.description}
            onChange={update('description')}
            placeholder="Optional details"
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            className="form-select"
            value={form.priority}
            onChange={update('priority')}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}
