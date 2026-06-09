import { useState, useEffect, useCallback, useRef } from 'react'

export default function TaskModal({ task, defaultStatus = 'todo', onSubmit, onClose }) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState(task?.status ?? defaultStatus)
  const [saving, setSaving] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!title.trim()) {
      setTitleError(true)
      titleRef.current?.focus()
      setTimeout(() => setTitleError(false), 1500)
      return
    }
    setSaving(true)
    try {
      await onSubmit({ id: task?.id, title: title.trim(), description: description.trim(), status })
    } catch {
      // error toast handled by App
    } finally {
      setSaving(false)
    }
  }, [title, description, status, task, onSubmit])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSubmit, onClose])

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <span className="modal-title">{task ? 'Edit Task' : 'New Task'}</span>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="field">
            <label>Title</label>
            <input
              ref={titleRef}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              style={titleError ? { borderColor: 'var(--danger)' } : {}}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add more details…"
            />
          </div>
          <div className="field">
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving
              ? <><span className="spinner" /> Saving…</>
              : task ? 'Save Changes' : 'Create Task'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
