import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Board from './components/Board'
import TaskModal from './components/TaskModal'
import Toast from './components/Toast'
import { fetchTasks, createTask, updateTask } from './api/tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | { task?, defaultStatus? }
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3350)
  }, [])

  const loadTasks = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      setTasks(await fetchTasks())
    } catch {
      if (!silent) addToast('Could not load tasks', 'error')
    } finally {
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    (async () => {
      for (let i = 0; i < 3; i++) {
        try {
          setTasks(await fetchTasks())
          setLoading(false)
          return
        } catch {
          await new Promise(r => setTimeout(r, 1500 * (i + 1)))
        }
      }
      setLoading(false)
      addToast('Could not load tasks', 'error')
    })()
  }, [addToast])

  async function handleSubmit({ id, title, description, status }) {
    try {
      if (id) {
        await updateTask(id, title, description, status)
        addToast('Task updated')
      } else {
        await createTask(title, description, status)
        addToast('Task created')
      }
      await loadTasks(true)
      setModal(null)
    } catch {
      addToast('Something went wrong', 'error')
      throw new Error('submit failed')
    }
  }

  return (
    <>
      <Header onRefresh={() => loadTasks()} onNew={() => setModal({})} />
      <Board
        tasks={tasks}
        loading={loading}
        onCardClick={task => setModal({ task })}
        onAddClick={status => setModal({ defaultStatus: status })}
      />
      {modal !== null && (
        <TaskModal
          task={modal.task}
          defaultStatus={modal.defaultStatus}
          onSubmit={handleSubmit}
          onClose={() => setModal(null)}
        />
      )}
      <Toast toasts={toasts} />
    </>
  )
}
