import { useState, useEffect, useRef } from 'react'
import { fetchMetrics, fetchHealth } from '../utils/api'

export function useMetrics() {
  const [metrics, setMetrics] = useState(null)
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const intervalRef = useRef(null)

  const load = async () => {
    try {
      const [mRes, hRes] = await Promise.all([fetchMetrics(), fetchHealth()])
      setMetrics(mRes.data)
      setHealth(hRes.data)
      setError(null)
      setHistory(prev => {
        const next = [...prev, {
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: mRes.data.cpu_raw,
          memory: Math.round(mRes.data.memory_raw / 6.4),
          requests: mRes.data.requests,
          latency: mRes.data.api_latency_ms,
        }]
        return next.slice(-20)
      })
    } catch (e) {
      setError('Backend unreachable — showing cached data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    intervalRef.current = setInterval(load, 4000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return { metrics, health, loading, error, history }
}
