const STATUS_LABELS = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' }

export default function TaskCard({ task, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <p className="card-title">{task.title}</p>
      {task.description && <p className="card-desc">{task.description}</p>}
      <div className="card-footer">
        <span className={`badge ${task.status}`}>
          {STATUS_LABELS[task.status] ?? task.status}
        </span>
        <button
          className="card-edit-btn"
          onClick={e => { e.stopPropagation(); onClick() }}
        >
          Edit
        </button>
      </div>
    </div>
  )
}
