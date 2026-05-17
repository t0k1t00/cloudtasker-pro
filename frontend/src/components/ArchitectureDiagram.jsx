import { motion } from 'framer-motion'
import { Monitor, Globe, Server, Database, Box, ArrowDown } from 'lucide-react'

const NODE = ({ icon: Icon, label, sublabel, color, delay, badge }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
    className={`relative flex flex-col items-center gap-1.5 px-5 py-3.5 rounded-xl border ${color} backdrop-blur-sm`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-xs font-semibold text-white whitespace-nowrap">{label}</span>
    {sublabel && <span className="text-[9px] text-slate-500 whitespace-nowrap">{sublabel}</span>}
    {badge && (
      <span className="absolute -top-2 -right-2 text-[9px] bg-blue-600 text-white rounded-full px-1.5 py-0.5 font-mono">
        {badge}
      </span>
    )}
  </motion.div>
)

const ARROW = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0 }}
    animate={{ opacity: 1, scaleY: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="flex flex-col items-center gap-0.5 py-1"
  >
    <div className="w-px h-5 bg-gradient-to-b from-blue-500/60 to-blue-500/20" />
    <ArrowDown className="w-3 h-3 text-blue-500" />
  </motion.div>
)

export default function ArchitectureDiagram() {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-white">Cluster Architecture</h2>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-px bg-blue-500 inline-block" /> network path</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500/20 border border-blue-500/30 inline-block" /> K8s resource</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Browser */}
          <NODE icon={Monitor} label="Browser" sublabel="User Client" delay={0.1}
            color="border-slate-600/40 bg-slate-800/40 text-slate-300" />
          <ARROW delay={0.2} />

          {/* Ingress */}
          <NODE icon={Globe} label="Ingress Controller" sublabel="nginx / port 80" delay={0.25}
            color="border-blue-500/30 bg-blue-500/10 text-blue-400" />
          <ARROW delay={0.35} />

          {/* Namespace box */}
          <div className="relative border border-blue-500/15 rounded-2xl p-4 bg-blue-500/3">
            <span className="absolute -top-2.5 left-4 text-[9px] text-blue-500 bg-surface-900 px-2 font-mono">namespace: cloudtasker</span>

            <div className="flex gap-8 items-start">
              {/* Frontend col */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] text-slate-500 mb-2 font-mono">frontend</div>
                <NODE icon={Server} label="Frontend Service" sublabel="NodePort :30080" badge="SVC" delay={0.4}
                  color="border-emerald-500/30 bg-emerald-500/10 text-emerald-400" />
                <ARROW delay={0.5} />
                <div className="relative border border-emerald-500/20 rounded-xl p-3 bg-emerald-500/5">
                  <span className="absolute -top-2 left-3 text-[9px] text-emerald-500 bg-surface-900 px-1 font-mono">ReplicaSet ×2</span>
                  <div className="flex gap-2 mt-1">
                    {[1,2].map(n => (
                      <motion.div key={n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 + n * 0.08 }}
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/8">
                        <Box className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[9px] text-emerald-400 font-mono">pod-{n}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex flex-col items-center self-center gap-1 pt-8">
                <div className="h-px w-8 bg-gradient-to-r from-emerald-500/30 via-blue-500/50 to-violet-500/30" />
                <span className="text-[8px] text-slate-600 font-mono">ClusterIP</span>
              </div>

              {/* Backend col */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] text-slate-500 mb-2 font-mono">backend</div>
                <NODE icon={Database} label="Backend Service" sublabel="ClusterIP :5000" badge="SVC" delay={0.4}
                  color="border-violet-500/30 bg-violet-500/10 text-violet-400" />
                <ARROW delay={0.5} />
                <div className="relative border border-violet-500/20 rounded-xl p-3 bg-violet-500/5">
                  <span className="absolute -top-2 left-3 text-[9px] text-violet-500 bg-surface-900 px-1 font-mono">ReplicaSet ×2</span>
                  <div className="flex gap-2 mt-1">
                    {[1,2].map(n => (
                      <motion.div key={n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 + n * 0.08 }}
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-violet-500/20 bg-violet-500/8">
                        <Box className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-[9px] text-violet-400 font-mono">pod-{n}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-slow" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
