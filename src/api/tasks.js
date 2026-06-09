export async function fetchTasks() {
  const res = await fetch('/tasks')
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return (await res.json()) || []
}

export async function createTask(title, description, status) {
  const res = await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, status }),
  })
  if (res.status !== 201) throw new Error('Failed to create task')
  return res.json()
}

export async function updateTask(id, title, description, status) {
  const res = await fetch('/tasks', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, description, status }),
  })
  if (!res.ok) throw new Error('Failed to update task')
}
