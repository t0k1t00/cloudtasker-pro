import { useState, useEffect } from 'react'
import { fetchTasks, createTask, deleteTask, toggleTask } from '../utils/api'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await fetchTasks()
      setTasks(res.data)
    } catch {
      // keep current state
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const addTask = async (title, priority = 'medium') => {
    const res = await createTask({ title, priority })
    setTasks(prev => [...prev, res.data])
  }

  const removeTask = async (id) => {
    await deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const toggle = async (id) => {
    const res = await toggleTask(id)
    setTasks(prev => prev.map(t => t.id === id ? res.data : t))
  }

  return { tasks, loading, addTask, removeTask, toggle }
}
