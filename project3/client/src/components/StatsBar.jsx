export default function StatsBar({ stats }) {
  return (
    <div className="stats-bar d-flex gap-4 align-items-center">
      <span>
        Total: <strong>{stats.total}</strong>
      </span>
      <span>
        Done: <strong className="text-success">{stats.done}</strong>
      </span>
      <span>
        Active: <strong className="text-primary">{stats.active}</strong>
      </span>
    </div>
  )
}
