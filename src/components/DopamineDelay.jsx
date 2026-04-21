import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, RotateCcw } from 'lucide-react'

/* ── Breathing phases ────────────────────────────────── */
const PHASES = [
  { text: 'Breathe in...', duration: 4000, scale: 1.25 },
  { text: 'Hold...',       duration: 4000, scale: 1.25 },
  { text: 'Breathe out...', duration: 6000, scale: 1.0  },
]

export default function DopamineDelay({ craving, onReset }) {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (phaseIdx + 1) % PHASES.length
      setPhaseIdx(next)
      if (next === 0) setCycleCount((c) => c + 1)
    }, PHASES[phaseIdx].duration)

    return () => clearTimeout(timer)
  }, [phaseIdx])

  const phase = PHASES[phaseIdx]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6"
    >
      {/* Dark Premium Overlay */}
      <div className="absolute inset-0 rounded-3xl bg-slate-950/60 backdrop-blur-3xl shadow-2xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        {/* Minimal Craving Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 rounded-full border border-white/8 bg-white/3 px-4 py-1.5 backdrop-blur-xl"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Intercepting: {craving}
          </span>
        </motion.div>

        {/* Breathing Circle Container */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Outer Ring */}
          <motion.div
            className="absolute h-56 w-56 rounded-full border border-emerald-500/5"
            animate={{
              scale: phase.scale * 1.1,
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{
              duration: phase.duration / 1000,
              ease: 'easeInOut',
            }}
          />

          {/* Middle Ring */}
          <motion.div
            className="absolute h-44 w-44 rounded-full border border-emerald-500/10"
            animate={{
              scale: phase.scale,
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: phase.duration / 1000,
              ease: 'easeInOut',
            }}
          />

          {/* Main Breathing Orb */}
          <motion.div
            className="flex h-36 w-36 items-center justify-center rounded-full bg-slate-900 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
            animate={{
              scale: phase.scale,
            }}
            transition={{
              duration: phase.duration / 1000,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              animate={{ 
                rotate: phaseIdx === 0 ? 0 : phaseIdx === 1 ? 180 : 360,
                opacity: phaseIdx === 1 ? 0.4 : 1
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Wind
                size={32}
                className="text-emerald-400/60"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Phase Text */}
        <div className="mt-12 h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={phaseIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold tracking-tight text-white"
            >
              {phase.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="mt-6 flex gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map(i => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full transition-all duration-500 ${
                phaseIdx === i ? 'bg-emerald-500 w-12' : 'bg-white/10'
              }`}
            />
          ))}
        </motion.div>

        {/* Reset Button - Appears after first cycle */}
        <AnimatePresence>
          {cycleCount >= 1 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={onReset}
              className="mt-12 flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-6 py-3.5 text-sm font-medium text-slate-400 transition-all hover:border-white/15 hover:bg-white/5 hover:text-slate-200 cursor-pointer"
              id="reset-btn"
            >
              <RotateCcw size={16} />
              The feeling has passed
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
