import TaskCard from './TaskCard'

export default function Column({ label, dotClass, tasks, loading, onCardClick, onAddClick }) {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          <span className={`col-dot ${dotClass}`} />
          {label}
        </div>
        <span className="col-count">{tasks.length}</span>
      </div>

      <div className="column-body">
        {loading ? (
          <>
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
          </>
        ) : tasks.length === 0 ? (
          <div className="empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
            </svg>
            No tasks here
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={() => onCardClick(task)} />
          ))
        )}
      </div>

      <button className="add-card-btn" onClick={onAddClick}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add task
      </button>
    </div>
  )
}
