import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts'
import { Activity, Server, Zap, Shield } from 'lucide-react'

function ProgressBar({ value, max = 100, color = 'blue', label, sublabel }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono text-white">{sublabel || `${Math.round(pct)}%`}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
            color === 'green' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
            color === 'amber' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
            'bg-gradient-to-r from-violet-600 to-violet-400'
          }`}
        />
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass px-3 py-2 rounded-lg text-xs">
        <div className="text-slate-400 mb-1">{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }} className="font-mono">
            {p.name}: {p.value}{p.name === 'latency' ? 'ms' : '%'}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function CloudMonitoring({ metrics, history }) {
  const statusItems = [
    { label: 'API Uptime', value: '99.98%', icon: Activity, ok: true },
    { label: 'Replicas', value: `${metrics?.replicas ?? 2}/2`, icon: Server, ok: true },
    { label: 'Cluster', value: metrics?.cluster_status ?? 'running', icon: Shield, ok: true },
    { label: 'Deployment', value: metrics?.deployment_status ?? 'healthy', icon: Zap, ok: true },
  ]

  return (
    <div className="space-y-4">
      {/* Status grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statusItems.map(({ label, value, icon: Icon, ok }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 glass-hover"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-4 h-4 text-slate-500" />
              <span className={`w-2 h-2 rounded-full ${ok ? 'bg-emerald-400 animate-pulse-slow' : 'bg-red-400'}`} />
            </div>
            <div className="text-sm font-semibold text-white capitalize font-mono">{value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CPU/Memory chart */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-300">CPU & Memory Utilization</h3>
            <span className="text-[10px] text-slate-500 font-mono">Last 20 samples</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={history} margin={{ top: 0, right: 0, bottom: 0, left: -28 }}>
              <defs>
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 9 }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cpu" name="cpu" stroke="#3b82f6" strokeWidth={1.5} fill="url(#cpuGrad)" dot={false} />
              <Area type="monotone" dataKey="memory" name="memory" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#memGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Latency chart */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-300">API Latency (ms)</h3>
            <span className="text-[10px] font-mono text-emerald-400">{metrics?.api_latency_ms ?? '—'}ms current</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={history} margin={{ top: 0, right: 0, bottom: 0, left: -28 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 9 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="latency" name="latency" stroke="#06b6d4" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress bars */}
      <div className="glass rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-300 mb-4">Resource Allocation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProgressBar value={metrics?.cpu_raw ?? 43} label="CPU Usage" sublabel={metrics?.cpu ?? '43%'} color="blue" />
          <ProgressBar value={metrics?.memory_raw ?? 512} max={1024} label="Memory" sublabel={metrics?.memory ?? '512MB'} color="violet" />
          <ProgressBar value={68} label="Network I/O" sublabel="68%" color="green" />
          <ProgressBar value={42} label="Disk I/O" sublabel="42%" color="amber" />
        </div>
      </div>
    </div>
  )
}
