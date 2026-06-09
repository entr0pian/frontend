export default function Header({ onRefresh, onNew }) {
  return (
    <header>
      <div className="logo">Task<span>App</span></div>
      <div className="header-actions">
        <button className="btn btn-ghost" onClick={onRefresh}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          Refresh
        </button>
        <button className="btn btn-primary" onClick={onNew}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Task
        </button>
      </div>
    </header>
  )
}
