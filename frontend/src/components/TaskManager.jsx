import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, Search, Tag, Loader } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'

const PRIORITIES = ['high', 'medium', 'low']

export default function TaskManager() {
  const { tasks, loading, addTask, removeTask, toggle } = useTasks()
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)

  const handleAdd = async () => {
    if (!input.trim()) return
    setAdding(true)
    try {
      await addTask(input.trim(), priority)
      setInput('')
    } finally {
      setAdding(false)
    }
  }

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="glass rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-white">Task Queue</h2>
          <p className="text-xs text-slate-500 mt-0.5">{tasks.filter(t => !t.completed).length} pending · {tasks.filter(t => t.completed).length} complete</p>
        </div>
        <div className="flex gap-1.5">
          {PRIORITIES.map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-md capitalize transition-all ${
                priority === p
                  ? p === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : p === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-white/5 border border-white/8 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:bg-white/8 transition-all"
        />
      </div>

      {/* Add task */}
      <div className="flex gap-2 mb-5">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="New task..."
          className="flex-1 px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
        />
        <button
          onClick={handleAdd}
          disabled={adding || !input.trim()}
          className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all flex items-center gap-1.5"
        >
          {adding ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          <span className="text-xs font-medium">Add</span>
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-5 h-5 animate-spin text-blue-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8 text-slate-600 text-xs">No tasks found</div>
        ) : (
          <AnimatePresence>
            {filtered.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/10 transition-all group"
              >
                <button
                  onClick={() => toggle(task.id)}
                  className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all border ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-600 hover:border-blue-400'
                  }`}
                >
                  {task.completed && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                </button>

                <span className={`flex-1 text-xs transition-all ${
                  task.completed ? 'line-through text-slate-600' : 'text-slate-300'
                }`}>
                  {task.title}
                </span>

                <span className={`px-1.5 py-0.5 text-[9px] rounded font-medium flex-shrink-0 priority-${task.priority}`}>
                  {task.priority}
                </span>

                <button
                  onClick={() => removeTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-slate-600 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
