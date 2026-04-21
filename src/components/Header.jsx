import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between rounded-2xl border border-white/8 bg-slate-950/40 px-6 py-4 backdrop-blur-2xl shadow-2xl shadow-black/40"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
          <span className="text-lg font-bold text-emerald-400">N</span>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-white">
          Nutri<span className="text-emerald-400">Shift</span>
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Glowing status dot */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live</span>
        </div>

        {/* Settings icon button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-slate-400 transition-all hover:border-white/15 hover:bg-white/5 hover:text-slate-200"
          aria-label="Settings"
          id="settings-btn"
        >
          <Settings size={18} strokeWidth={2} />
        </motion.button>
      </div>
    </motion.header>
  )
}
