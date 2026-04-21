import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SwapDashboard({ swapData, craving, onAccept, onReject }) {
  if (!swapData) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-8"
    >
      {/* SECTION 1 — HEADER */}
      <motion.div variants={sectionVariants} className="mb-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
          Craving Intercepted
        </h2>
        <p className="text-base font-normal text-slate-400">
          Here's your smarter swap
        </p>
      </motion.div>

      {/* SECTION 2 — VERSUS CARD */}
      <motion.div variants={sectionVariants} className="relative mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* LEFT COLUMN: The Craving */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-slate-950/40 p-6 backdrop-blur-2xl shadow-2xl shadow-black/40">
            <span className="mb-3 text-xs tracking-widest text-slate-500 uppercase">
              You wanted
            </span>
            <p className="text-center text-xl font-bold tracking-tight text-white capitalize">
              {craving}
            </p>
          </div>

          {/* RIGHT COLUMN: The Swap */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-slate-950/40 p-6 backdrop-blur-2xl shadow-2xl shadow-black/40">
            <span className="mb-3 text-xs tracking-widest text-slate-500 uppercase">
              Aura suggests
            </span>
            <p className="text-center text-xl font-bold tracking-tight text-white">
              {swapData.swap}
            </p>
          </div>
        </div>

        {/* VS Badge Divider (Hidden on small screens, absolute center on medium+) */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/8 bg-slate-900 px-3 py-1.5 backdrop-blur-2xl md:flex shadow-2xl">
          <span className="text-xs font-bold tracking-widest text-slate-500">
            VS
          </span>
        </div>
      </motion.div>

      {/* SECTION 3 — METRICS GRID */}
      <motion.div variants={sectionVariants} className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Box 1: Calories */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-slate-950/40 p-6 backdrop-blur-2xl shadow-2xl shadow-black/40 text-center">
          <span className="text-3xl font-bold tracking-tight text-white mb-2">
            <span className="text-emerald-400">{swapData.caloriesSaved}</span> kcal
          </span>
          <span className="text-xs tracking-widest text-slate-500 uppercase font-medium">
            Calories Saved
          </span>
          <span className="mt-1 text-[11px] text-slate-500 font-medium tracking-wide">
            vs. your original craving
          </span>
        </div>

        {/* Box 2: Money */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-slate-950/40 p-6 backdrop-blur-2xl shadow-2xl shadow-black/40 text-center">
          <span className="text-3xl font-bold tracking-tight text-white mb-2">
            <span className="text-amber-400">₹{swapData.rupeesSaved}</span>
          </span>
          <span className="text-xs tracking-widest text-slate-500 uppercase font-medium">
            Delivery Tax Avoided
          </span>
          <span className="mt-1 text-[11px] text-slate-500 font-medium tracking-wide">
            vs. ordering on Swiggy/Zomato
          </span>
        </div>
      </motion.div>

      {/* SECTION 4 — NUDGE */}
      <motion.div variants={sectionVariants} className="mb-8 rounded-2xl border-l-4 border-l-violet-500/40 border-t border-b border-r border-white/8 bg-slate-950/40 p-5 backdrop-blur-2xl shadow-2xl shadow-black/40">
        <p className="text-lg italic text-slate-400">
          "{swapData.nudge}"
        </p>
      </motion.div>

      {/* SECTION 5 — ACTION BUTTONS */}
      <motion.div variants={sectionVariants} className="flex flex-col gap-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onAccept}
          className="w-full rounded-xl bg-slate-900 border border-emerald-500/40 py-3.5 px-6 font-medium text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-200 hover:border-emerald-400/70 hover:shadow-[0_0_32px_rgba(16,185,129,0.25)] hover:text-white cursor-pointer"
        >
          Accept Swap & Build Streak
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReject}
          className="w-full rounded-xl border border-white/8 bg-transparent py-3.5 px-6 font-medium text-slate-500 transition-all duration-200 hover:border-white/15 hover:bg-white/3 hover:text-slate-400 cursor-pointer"
        >
          I'll stick to my craving
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
