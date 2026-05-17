import { motion } from 'framer-motion'
import { Cloud, Bell, Settings, ChevronDown } from 'lucide-react'

export default function Navbar({ backendOnline }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-blue-500/10"
    >
      <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center glow-blue">
              <Cloud className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 glow-green" />
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-tight">CloudTasker</span>
            <span className="text-sm font-bold text-blue-400 tracking-tight"> Pro</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 ml-1">
            <span className="text-[10px] font-mono text-blue-400">v1.4.2</span>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {['Overview', 'Workloads', 'Networking', 'Storage', 'Access'].map((item, i) => (
            <button
              key={item}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                i === 0
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* K8s status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-full">
            <span className={`w-1.5 h-1.5 rounded-full ${backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-xs text-slate-300 font-mono">
              {backendOnline ? 'k8s: healthy' : 'k8s: degraded'}
            </span>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-200">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
          </button>

          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-200">
            <Settings className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
            <span className="hidden sm:block text-xs text-slate-300">Admin</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
