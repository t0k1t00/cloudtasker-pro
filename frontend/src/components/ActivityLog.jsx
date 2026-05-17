import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

const LOG_TEMPLATES = [
  { level: 'INFO', messages: [
    'Frontend connected to backend API',
    'Deployment cloudtasker-backend healthy',
    'Pod cloudtasker-backend-xxxx-yyyy ready',
    'API latency stable at 18ms',
    'HPA: scaling pods 2 → 3',
    'Health check passed on /api/health',
    'ConfigMap cloudtasker-config updated',
    'Replica set sync complete',
    'Ingress routing verified',
    'Service mesh heartbeat OK',
  ]},
  { level: 'WARN', messages: [
    'CPU usage 68% — approaching threshold',
    'Memory pressure detected on node-2',
    'Pod restart count: 1 (acceptable)',
    'Slow response: 120ms on /api/tasks',
  ]},
  { level: 'SUCCESS', messages: [
    'Rolling update completed successfully',
    'Pod scaled and registered in 3.2s',
    'TLS certificate renewed',
    'Cluster health: all systems nominal',
  ]},
]

function generateLog() {
  const rand = Math.random()
  let pool
  if (rand < 0.65) pool = LOG_TEMPLATES[0]
  else if (rand < 0.85) pool = LOG_TEMPLATES[1]
  else pool = LOG_TEMPLATES[2]
  const msg = pool.messages[Math.floor(Math.random() * pool.messages.length)]
  return {
    id: Date.now() + Math.random(),
    level: pool.level,
    message: msg,
    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
  }
}

const LEVEL_STYLE = {
  INFO: 'text-blue-400',
  WARN: 'text-amber-400',
  SUCCESS: 'text-emerald-400',
  ERROR: 'text-red-400',
}

const INIT_LOGS = [
  { id: 1, level: 'INFO', message: 'CloudTasker Pro initializing...', time: '00:00:00' },
  { id: 2, level: 'INFO', message: 'Namespace cloudtasker created', time: '00:00:01' },
  { id: 3, level: 'SUCCESS', message: 'Backend deployment ready (2/2 replicas)', time: '00:00:02' },
  { id: 4, level: 'INFO', message: 'Frontend service exposed on NodePort 30080', time: '00:00:03' },
  { id: 5, level: 'SUCCESS', message: 'All health probes passing', time: '00:00:04' },
]

export default function ActivityLog() {
  const [logs, setLogs] = useState(INIT_LOGS)
  const bottomRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, generateLog()]
        return next.slice(-60)
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="glass rounded-xl p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4 text-blue-400" />
        <h2 className="text-sm font-semibold text-white">Activity Log</h2>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-mono">STREAMING</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 font-mono pr-1" style={{ maxHeight: '420px' }}>
        {logs.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-2 text-[11px] leading-relaxed"
          >
            <span className="text-slate-600 flex-shrink-0">{log.time}</span>
            <span className={`flex-shrink-0 font-semibold ${LEVEL_STYLE[log.level] || 'text-slate-400'}`}>
              [{log.level}]
            </span>
            <span className="text-slate-400">{log.message}</span>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
