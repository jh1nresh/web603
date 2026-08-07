import TaskItem from './TaskItem'

export default function TaskList({ tasks, loading, ...handlers }) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading tasks…</span>
        </div>
      </div>
    )
  }

  if (!tasks.length) {
    return <p className="empty-state">Nothing here yet — add your first task on the left.</p>
  }

  return (
    <ul className="task-list list-unstyled">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} {...handlers} />
      ))}
    </ul>
  )
}
