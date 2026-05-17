import { motion } from 'framer-motion'
import { Activity, Cpu, HardDrive, Server, Zap, Heart } from 'lucide-react'
import Navbar from './components/Navbar'
import MetricCard from './components/MetricCard'
import TaskManager from './components/TaskManager'
import ActivityLog from './components/ActivityLog'
import CloudMonitoring from './components/CloudMonitoring'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import { useMetrics } from './hooks/useMetrics'

function SectionHeader({ title, sub }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function App() {
  const { metrics, health, loading, error, history } = useMetrics()

  const backendOnline = health?.status === 'healthy'

  return (
    <div className="min-h-screen bg-[#0a0e1a] grid-bg">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/6 blur-[100px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-80 h-80 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

      <Navbar backendOnline={backendOnline} />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 pt-20 pb-16 space-y-10">

        {/* Error banner */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
            <Zap className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Hero: metric cards */}
        <section>
          <SectionHeader
            title="Cluster Overview"
            sub={`Namespace: cloudtasker · Context: minikube · ${new Date().toLocaleString()}`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            <MetricCard
              icon={Heart}
              label="Backend Status"
              value={loading ? '...' : backendOnline ? 'healthy' : 'down'}
              sub={health?.version}
              gradient="metric-gradient-green"
              iconColor="text-emerald-400"
              delay={0.05}
              pulse
            />
            <MetricCard
              icon={Server}
              label="Active Pods"
              value={loading ? '—' : String(metrics?.pods ?? 2)}
              sub="2 replicas target"
              gradient="metric-gradient-blue"
              iconColor="text-blue-400"
              delay={0.1}
            />
            <MetricCard
              icon={Activity}
              label="API Requests"
              value={loading ? '—' : String(metrics?.requests ?? 0)}
              sub="total since start"
              gradient="metric-gradient-purple"
              iconColor="text-violet-400"
              delay={0.15}
              pulse
            />
            <MetricCard
              icon={Cpu}
              label="CPU Usage"
              value={loading ? '—' : metrics?.cpu ?? '—'}
              sub="across all pods"
              gradient="metric-gradient-amber"
              iconColor="text-amber-400"
              delay={0.2}
            />
            <MetricCard
              icon={HardDrive}
              label="Memory"
              value={loading ? '—' : metrics?.memory ?? '—'}
              sub="heap allocated"
              gradient="metric-gradient-cyan"
              iconColor="text-cyan-400"
              delay={0.25}
            />
            <MetricCard
              icon={Zap}
              label="Cluster Health"
              value={loading ? '—' : '100%'}
              sub={metrics?.uptime ?? 'uptime'}
              gradient="metric-gradient-rose"
              iconColor="text-rose-400"
              delay={0.3}
            />
          </div>
        </section>

        {/* Tasks + Log */}
        <section>
          <SectionHeader title="Operations" sub="Task queue and live event stream" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TaskManager />
            <ActivityLog />
          </div>
        </section>

        {/* Cloud Monitoring */}
        <section>
          <SectionHeader title="Monitoring" sub="Real-time cluster metrics and resource utilization" />
          <CloudMonitoring metrics={metrics} history={history} />
        </section>

        {/* Architecture */}
        <section>
          <SectionHeader title="Architecture" sub="Kubernetes resource topology" />
          <ArchitectureDiagram />
        </section>

        {/* Footer */}
        <footer className="text-center text-[10px] text-slate-700 font-mono pt-4">
          CloudTasker Pro · Kubernetes Assignment · 2025 · Built with React + Flask + K8s
        </footer>
      </main>
    </div>
  )
}
