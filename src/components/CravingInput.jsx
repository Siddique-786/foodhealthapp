import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Eye, EyeOff, Key } from 'lucide-react'
import { useToast } from '../hooks/useToast'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function CravingInput({ onIntercept, streak = 0, history = [] }) {
  const [craving, setCraving] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [cravingError, setCravingError] = useState(false)
  const { showToast } = useToast()

  // Calculate streak progress (percentage of next meaningful milestone)
  const nextMilestone = streak < 3 ? 3 : streak < 7 ? 7 : streak < 14 ? 14 : 30
  const progressPercent = Math.min((streak / nextMilestone) * 100, 100)

  const handleCravingChange = (e) => {
    setCraving(e.target.value)
    setCravingError(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!craving.trim()) {
      setCravingError(true)
      showToast("Tell me what you're craving first 👀", 'info')
      return
    }

    onIntercept(craving.trim())
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-1 flex-col items-center justify-center px-4 py-12 gap-8"
    >
      {/* Top Section: Streak Progress */}
      <motion.div variants={childVariants} className="mb-8 w-full max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 font-semibold tracking-wider uppercase text-xs">
            Current Streak
          </span>
          <span className="text-xs font-bold text-emerald-400">
            {streak} {streak === 1 ? 'Day' : 'Days'}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/5 border border-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          />
        </div>
        {streak > 0 && (
          <p className="mt-2 text-[10px] text-slate-600 text-right font-medium">
            Next milestone: {nextMilestone} days
          </p>
        )}
      </motion.div>



      {/* Badge (Hidden or Made Minimal for Maturity) */}
      <motion.div variants={childVariants} className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
          Mindful Craving Interceptor
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        variants={childVariants}
        className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl"
      >
        What are you{' '}
        <span className="text-emerald-400">
          craving
        </span>
        <br />
        right now?
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={childVariants}
        className="mt-6 max-w-md text-center text-base font-normal text-slate-400"
      >
        Intercept unhealthy decisions with behavioral science and smart swaps.
      </motion.p>

      {/* Submit Button Section */}
      <motion.form
        variants={childVariants}
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-lg mb-12"
      >
        {/* Pill input */}
        <motion.div
           animate={cravingError ? { x: [-8, 8, -6, 6, 0] } : {}}
           transition={{ duration: 0.4 }}
           className={`relative overflow-hidden rounded-2xl bg-slate-900/80 transition-all duration-300 border ${
             isFocused
               ? 'border-emerald-500 ring-1 ring-emerald-500'
               : 'border-slate-700 hover:border-slate-600'
           }`}
         >
           <input
             id="craving-input"
             type="text"
             value={craving}
             onChange={handleCravingChange}
             onFocus={() => setIsFocused(true)}
             onBlur={() => setIsFocused(false)}
             placeholder="e.g. chocolate cake, pizza, soda..."
             className="w-full bg-transparent px-6 py-5 text-lg font-medium text-white placeholder-slate-500 focus:outline-none"
             autoComplete="off"
           />

           {/* Minimal focus line */}
           <motion.div
             className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
             initial={{ width: '0%' }}
             animate={{ width: isFocused ? '100%' : '0%' }}
             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
           />
         </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className={`mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl py-4 transition-all duration-200 ${
            craving.trim()
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer'
              : 'bg-slate-800 border border-slate-700 text-slate-600 cursor-not-allowed'
          }`}
          id="intercept-btn"
        >
          Intercept Craving
          <ArrowRight
            size={20}
            strokeWidth={3}
          />
        </motion.button>
      </motion.form>

      {/* RECENT HISTORY LIST */}
      {history.length > 0 && (
        <motion.div variants={childVariants} className="w-full max-w-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-slate-300 font-semibold tracking-wider uppercase text-xs whitespace-nowrap">
              Recent Intercepts
            </span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <div className="flex flex-col gap-3">
            {history.slice(0, 3).map((item, idx) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/2 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500 mb-0.5">
                    {item.date}
                  </span>
                  <p className="text-xs font-semibold text-slate-300">
                    <span className="text-red-400/70 line-through mr-2">{item.craving}</span>
                    <span className="text-emerald-400 font-bold">{item.swap}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-emerald-500/80">
                    -{item.caloriesSaved} kcal
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Helper hint */}
      <motion.p
        variants={childVariants}
        className="mt-12 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700"
      >
        Analysis & Behavioral Delay to follow
      </motion.p>
    </motion.div>
  )
}
