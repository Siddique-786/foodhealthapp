import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ParticleBurst({ onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2
      const distance = 80 + Math.random() * 120
      const rotation = Math.random() * 360
      const duration = 0.8 + Math.random() * 0.4
      
      const isDot = Math.random() > 0.5
      const size = isDot 
        ? `${Math.floor(Math.random() * 3 + 2)}px` // 2-4px width/height for dot
        : '1px' // line width
      const height = isDot ? size : '8px' // line height
      
      const colors = ['bg-emerald-400', 'bg-teal-400', 'bg-cyan-400']
      const color = colors[Math.floor(Math.random() * colors.length)]

      return {
        id: i,
        angle,
        distance,
        rotation,
        duration,
        size,
        height,
        color,
      }
    })
    
    setParticles(newParticles)

    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 1200)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{ width: p.size, height: p.height }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            scale: 0,
            rotate: p.rotation
          }}
          transition={{
            duration: p.duration,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
