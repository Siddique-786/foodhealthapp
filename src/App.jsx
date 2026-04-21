import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingBackground from './components/FloatingBackground'
import Header from './components/Header'
import CravingInput from './components/CravingInput'
import DopamineDelay from './components/DopamineDelay'
import SwapDashboard from './components/SwapDashboard'
import Toast from './components/Toast'
import ParticleBurst from './components/ParticleBurst'
import { useToast } from './hooks/useToast'
import { useGemini } from './hooks/useGemini'

export default function App() {
  const [appState, setAppState] = useState('input') // 'input' | 'delay' | 'result'
  const [swapData, setSwapData] = useState(null)
  const [userCraving, setUserCraving] = useState('')
  const [showParticles, setShowParticles] = useState(false)
  
  // Gamification State
  const [streak, setStreak] = useState(0)
  const [history, setHistory] = useState([])
  
  const { toast, showToast } = useToast()
  const { fetchSwap } = useGemini()

  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem('nutriShiftStreak')) || 0
    const savedHistory = JSON.parse(localStorage.getItem('nutriShiftHistory')) || []
    setStreak(savedStreak)
    setHistory(savedHistory)
  }, [])

  const handleIntercept = async (craving) => {
    setAppState('delay')
    setUserCraving(craving)

    try {
      const [swapResult] = await Promise.all([
        fetchSwap(craving),
        new Promise(resolve => setTimeout(resolve, 4000))
      ])

      setSwapData(swapResult)
      setAppState('result')
    } catch (err) {
      setAppState('input')
      showToast("Something went wrong. Please try again.", "error")
    }
  }

  const handleAcceptSwap = () => {
    // STEP 1: Particle Burst
    setShowParticles(true)

    // STEP 2: Streak Update
    const newStreak = streak + 1
    setStreak(newStreak)
    localStorage.setItem('nutriShiftStreak', newStreak)

    // Fire milestone toast
    if (newStreak === 3) showToast("🌱 3 days strong. A habit is forming.", "success")
    else if (newStreak === 7) showToast("🔥 7-day streak. You're consistent.", "success")
    else if (newStreak === 14) showToast("⚡ 2 weeks. This is who you are now.", "success")
    else if (newStreak === 30) showToast("🏆 30 days. You've changed your life.", "success")
    else showToast("Swap accepted. Streak updated.", "success")

    // STEP 3: History Log
    const newEntry = {
      id: Date.now(),
      craving: userCraving,
      swap: swapData.swap,
      caloriesSaved: swapData.caloriesSaved,
      rupeesSaved: swapData.rupeesSaved,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
    const updatedHistory = [newEntry, ...history].slice(0, 5)
    setHistory(updatedHistory)
    localStorage.setItem('nutriShiftHistory', JSON.stringify(updatedHistory))

    // Switch back to input state
    setAppState('input')
    // We could technically trigger a history/streak reload here if needed by CravingInput
  }

  const handleRejectSwap = () => {
    setAppState('input')
    showToast("No judgment. Every craving is data. 🌱", "info")
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950">
      {/* Global abstract background */}
      <FloatingBackground />

      {/* Main glass container */}
      <div className="relative z-10 mx-auto flex min-h-[85dvh] w-full max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6">
        {/* Header */}
        <Header />

        {/* Content area */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-slate-950/60 backdrop-blur-2xl border border-slate-800 shadow-2xl shadow-black/50">
          <AnimatePresence mode="wait">
            {appState === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-1 flex-col"
              >
                <CravingInput 
                  onIntercept={handleIntercept} 
                  streak={streak}
                  history={history}
                />
              </motion.div>
            )}
            
            {appState === 'delay' && (
              <motion.div
                key="delay"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-1 flex-col relative"
              >
                <DopamineDelay craving={userCraving} onReset={() => setAppState('input')} />
              </motion.div>
            )}
            
            {appState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-1 flex-col"
              >
                <SwapDashboard 
                  swapData={swapData} 
                  craving={userCraving}
                  onAccept={handleAcceptSwap} 
                  onReject={handleRejectSwap}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] font-medium tracking-wide text-slate-400/70">
          NutriShift v1.0 · Built with intention
        </p>
      </div>

      {/* Global Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      
      {/* Dynamic Particle Overlay */}
      {showParticles && <ParticleBurst onComplete={() => setShowParticles(false)} />}
    </div>
  )
}
