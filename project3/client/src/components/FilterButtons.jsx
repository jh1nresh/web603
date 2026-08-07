const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
]

export default function FilterButtons({ value, onChange }) {
  return (
    <div className="btn-group btn-group-sm" role="group" aria-label="Filter tasks">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={`btn ${value === key ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
