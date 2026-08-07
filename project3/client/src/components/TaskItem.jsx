import { useState } from 'react'

const PRIORITY_LABEL = { high: 'High', medium: 'Med', low: 'Low' }

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task)
  const [error, setError] = useState('')

  const startEdit = () => {
    setDraft(task)
    setError('')
    setEditing(true)
  }

  const save = async (e) => {
    e.preventDefault()
    if (!draft.title.trim()) {
      setError('Title is required')
      return
    }
    try {
      await onUpdate(task.id, {
        title: draft.title,
        description: draft.description,
        priority: draft.priority,
      })
      setEditing(false)
    } catch (err) {
      setError(err.errors?.title || err.message)
    }
  }

  if (editing) {
    return (
      <li className={`task-card priority-${task.priority} editing`}>
        <form onSubmit={save} className="w-100">
          <input
            className={`form-control form-control-sm mb-2 ${error ? 'is-invalid' : ''}`}
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            aria-label="Task title"
          />
          {error && <div className="invalid-feedback d-block mb-2">{error}</div>}
          <textarea
            className="form-control form-control-sm mb-2"
            rows="2"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            aria-label="Task description"
          />
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm w-auto"
              value={draft.priority}
              onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
              aria-label="Task priority"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="btn btn-sm btn-primary" type="submit">
              Save
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="form-check-input mt-1"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark ${task.title} as ${task.completed ? 'active' : 'done'}`}
      />

      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && <div className="task-desc">{task.description}</div>}
      </div>

      <span className={`badge priority-badge badge-${task.priority}`}>
        {PRIORITY_LABEL[task.priority]}
      </span>

      <div className="task-actions">
        <button className="btn btn-sm btn-outline-secondary" onClick={startEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}
