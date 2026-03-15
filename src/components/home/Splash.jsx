import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  { text: '  PARTH_SAMARTH_OS v2026.03 ── Initializing...', color: 'var(--text-code)' },
  { text: '  ──────────────────────────────────────────────', color: 'var(--gold-dim)' },
  { text: '  [██████████] Loading core modules .............. ', okText: 'OK', color: 'var(--text-code)' },
  { text: '  [██████████] Mounting data pipelines ........... ', okText: 'OK', color: 'var(--text-code)' },
  { text: '  [██████████] Compiling portfolio ............... ', okText: 'OK', color: 'var(--text-code)' },
  { text: '  [██████████] Running model checks .............. ', okText: 'OK', color: 'var(--text-code)' },
  { text: '  ──────────────────────────────────────────────', color: 'var(--gold-dim)' },
  { text: '  All systems operational.', color: 'var(--text-code)' },
  { text: '  Welcome.', color: 'var(--text-code)' },
]

export default function Splash({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState('printing') // 'printing' | 'fading' | 'monogram' | 'done'
  const [showMonogram, setShowMonogram] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('splashShown')) {
      onComplete()
      return
    }

    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= bootLines.length) {
        clearInterval(interval)
        setTimeout(() => {
          setPhase('fading')
          setTimeout(() => {
            setPhase('monogram')
            setShowMonogram(true)
            setTimeout(() => {
              setPhase('done')
              sessionStorage.setItem('splashShown', 'true')
              onComplete()
            }, 700)
          }, 400)
        }, 600)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {phase === 'monogram' ? (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [1, 1, 1.2, 1.2] }}
              transition={{ duration: 0.7, times: [0, 0.2, 0.7, 1] }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--gold)',
                textShadow: '0 0 40px var(--gold-glow)',
              }}
            >
              PS
            </motion.div>
          ) : (
            <div style={{
              maxWidth: '560px', width: '100%', padding: '0 2rem',
              opacity: phase === 'fading' ? 0 : 1,
              transition: 'opacity 400ms',
            }}>
              {bootLines.slice(0, visibleCount).map((line, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                  color: line.color, lineHeight: 2,
                  display: 'flex', alignItems: 'center',
                }}>
                  <span>{line.text}</span>
                  {line.okText && (
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{line.okText}</span>
                  )}
                  {i === visibleCount - 1 && phase === 'printing' && (
                    <span style={{ animation: 'blink-cursor 0.6s step-end infinite', marginLeft: '2px' }}>|</span>
                  )}
                </div>
              ))}
            </div>
          )}
          <style>{`
            @keyframes blink-cursor {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
