import { useState, useEffect } from 'react'

function ToastItem({ message, type }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  return (
    <div className={`toast ${type}${visible ? ' show' : ''}`}>
      {type === 'success'
        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--done)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      }
      {message}
    </div>
  )
}

export default function Toast({ toasts }) {
  return (
    <div id="toast-container">
      {toasts.map(({ id, message, type }) => (
        <ToastItem key={id} message={message} type={type} />
      ))}
    </div>
  )
}
