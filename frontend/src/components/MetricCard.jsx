import { motion } from 'framer-motion'

export default function MetricCard({ icon: Icon, label, value, sub, gradient, iconColor, delay = 0, pulse }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className={`${gradient} rounded-xl p-5 glass-hover cursor-default select-none`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg bg-black/20`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        {pulse && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-mono">LIVE</span>
          </span>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white tracking-tight font-mono">{value ?? '—'}</div>
        <div className="text-xs text-slate-400 font-medium">{label}</div>
        {sub && <div className="text-[10px] text-slate-500">{sub}</div>}
      </div>
    </motion.div>
  )
}
