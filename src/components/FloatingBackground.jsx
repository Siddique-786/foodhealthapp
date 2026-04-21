import { motion } from 'framer-motion'

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-slate-950">
      {/* Subtle radial gradient overlay to add depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Orb 1: Emerald/Teal float */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/15 mix-blend-screen"
        style={{ filter: 'blur(140px)' }}
        animate={{
          y: [-20, 20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Orb 2: Violet/Purple float */}
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] h-[600px] w-[600px] rounded-full bg-violet-500/10 mix-blend-screen"
        style={{ filter: 'blur(160px)' }}
        animate={{
          y: [20, -20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Orb 3: Cyan subtle pulse */}
      <motion.div
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-cyan-500/8 mix-blend-screen"
        style={{ filter: 'blur(120px)' }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
