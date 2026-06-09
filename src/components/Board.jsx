import Column from './Column'

const COLUMNS = [
  { id: 'todo',        label: 'To Do',      dotClass: 'todo' },
  { id: 'in_progress', label: 'In Progress', dotClass: 'progress' },
  { id: 'done',        label: 'Done',        dotClass: 'done' },
]

export default function Board({ tasks, loading, onCardClick, onAddClick }) {
  const buckets = { todo: [], in_progress: [], done: [] }
  tasks.forEach(t => {
    const key = t.status in buckets ? t.status : 'todo'
    buckets[key].push(t)
  })

  return (
    <>
      <div className="stats-bar">
        <span className="stat"><strong>{tasks.length}</strong> total</span>
        <span className="stat-sep">·</span>
        <span className="stat" style={{ color: 'var(--todo)' }}><strong>{buckets.todo.length}</strong> to do</span>
        <span className="stat-sep">·</span>
        <span className="stat" style={{ color: 'var(--progress)' }}><strong>{buckets.in_progress.length}</strong> in progress</span>
        <span className="stat-sep">·</span>
        <span className="stat" style={{ color: 'var(--done)' }}><strong>{buckets.done.length}</strong> done</span>
      </div>
      <div className="board-wrapper">
        <div className="board">
          {COLUMNS.map(col => (
            <Column
              key={col.id}
              label={col.label}
              dotClass={col.dotClass}
              tasks={buckets[col.id]}
              loading={loading}
              onCardClick={onCardClick}
              onAddClick={() => onAddClick(col.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
