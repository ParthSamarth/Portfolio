import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Splash({ onComplete }) {
  const [lines, setLines] = useState([])
  const [showMonogram, setShowMonogram] = useState(false)
  const [done, setDone] = useState(false)
  const timeoutsRef = useRef([])

  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay)
    timeoutsRef.current.push(id)
    return id
  }

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('splashShown')) {
      onComplete()
      return
    }
    sessionStorage.setItem('splashShown', 'true')
    startSequence()
  }, [])

  function startSequence() {
    const BOOT_LINES = [
      { text: 'PARTH_SAMARTH_OS  v2026.03  [x86_64 · React + Vite]', color: 'var(--gold-mid)' },
      { text: '─────────────────────────────────────────────────────', color: 'rgba(224,172,16,0.2)' },
      { text: '[██████████] Loading core modules .............. OK',   color: 'var(--text-code)' },
      { text: '[██████████] Mounting data pipelines ........... OK',   color: 'var(--text-code)' },
      { text: '[██████████] Compiling portfolio ............... OK',   color: 'var(--text-code)' },
      { text: '[██████████] Running model checks .............. OK',   color: 'var(--text-code)' },
      { text: '─────────────────────────────────────────────────────', color: 'rgba(224,172,16,0.2)' },
      { text: 'All systems operational.',                               color: 'var(--text-code)' },
      { text: 'Welcome.',                                               color: 'var(--gold-bright)' },
    ]

    BOOT_LINES.forEach((line, i) => {
      addTimeout(() => {
        setLines(prev => [...prev, line])
      }, i * 180)
    })

    const totalPrintTime = BOOT_LINES.length * 180

    addTimeout(() => {
      setLines([])
      setShowMonogram(true)
    }, totalPrintTime + 700)

    addTimeout(() => {
      setDone(true)
    }, totalPrintTime + 700 + 900)

    addTimeout(() => {
      onComplete()
    }, totalPrintTime + 700 + 900 + 350)
  }

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--black-base)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* TERMINAL LINES */}
      <AnimatePresence>
        {!showMonogram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: '580px',
              width: '90%',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 1.5vw, 0.85rem)',
              lineHeight: 2,
            }}
          >
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: line.color, whiteSpace: 'pre' }}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Blinking cursor after last line */}
            {lines.length > 0 && lines.length < 9 && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.55em',
                  height: '1em',
                  background: 'var(--gold-mid)',
                  verticalAlign: 'text-bottom',
                  animation: 'blink 0.75s step-end infinite',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PS MONOGRAM */}
      <AnimatePresence>
        {showMonogram && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: done ? 1.15 : 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 900,
              color: 'var(--gold-mid)',
              letterSpacing: '0.15em',
              textShadow: '0 0 40px rgba(224,172,16,0.5), 0 0 80px rgba(224,172,16,0.2)',
            }}
          >
            PS
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
