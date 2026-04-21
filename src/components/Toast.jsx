import { motion, AnimatePresence } from 'framer-motion'

const TOAST_TYPES = {
  success: {
    emoji: '✅',
    borderColor: 'border-l-emerald-500/50',
    iconColor: 'text-emerald-400'
  },
  warning: {
    emoji: '⚠️',
    borderColor: 'border-l-amber-500/50',
    iconColor: 'text-amber-400'
  },
  error: {
    emoji: '❌',
    borderColor: 'border-l-red-500/50',
    iconColor: 'text-red-400'
  },
  info: {
    emoji: '💡',
    borderColor: 'border-l-violet-500/50',
    iconColor: 'text-violet-400'
  }
}

export default function Toast({ message, type, visible }) {
  const currentType = TOAST_TYPES[type] || TOAST_TYPES.info

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-4 rounded-xl border border-white/8 border-l-4 bg-slate-900/80 px-6 py-4 backdrop-blur-2xl shadow-2xl shadow-black/60 ${currentType.borderColor} min-w-[320px] max-w-[90vw]`}
        >
          <span className={`text-xl ${currentType.iconColor}`}>{currentType.emoji}</span>
          <span className="text-sm font-medium text-slate-200 tracking-tight leading-snug">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
