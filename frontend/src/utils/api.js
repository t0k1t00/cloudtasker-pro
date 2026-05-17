import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
})

export const fetchHealth = () => api.get('/health')
export const fetchMetrics = () => api.get('/metrics')
export const fetchTasks = () => api.get('/tasks')
export const createTask = (data) => api.post('/tasks', data)
export const deleteTask = (id) => api.delete(`/tasks/${id}`)
export const toggleTask = (id) => api.patch(`/tasks/${id}/toggle`)

export default api
