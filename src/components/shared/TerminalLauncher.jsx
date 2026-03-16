import { motion } from 'framer-motion'

export default function TerminalLauncher({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'fixed', bottom: '1.75rem', right: '1.75rem', zIndex: 400 }}
    >
      <button
        onClick={onOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--black-elevated, #141414)',
          border: '1px solid var(--gold-border-active, rgba(212,160,23,0.65))',
          borderRadius: 'var(--radius-sm, 3px)',
          padding: '9px 18px',
          cursor: 'pointer',
          transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
          width: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--gold-trace, rgba(224,172,16,0.09))'
          e.currentTarget.style.borderColor = 'var(--gold-border-hot, rgba(245,192,32,0.90))'
          e.currentTarget.style.boxShadow = 'var(--shadow-gold-sm, 0 0 16px rgba(224,172,16,0.25))'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--black-elevated, #141414)'
          e.currentTarget.style.borderColor = 'var(--gold-border-active, rgba(212,160,23,0.65))'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Blinking cursor block */}
        <span style={{
          width: '8px',
          height: '14px',
          background: 'var(--gold-mid, #E0AC10)',
          borderRadius: '1px',
          display: 'inline-block',
          flexShrink: 0,
          animation: 'terminal-blink 0.75s step-end infinite',
        }} />

        {/* Label */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--gold-mid, #E0AC10)',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}>
          &gt;_ terminal
        </span>
      </button>

      {/* Hint text — hidden on mobile */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        margin: '4px 0 0',
      }}
        className="terminal-launcher-hint"
      >
        press ` to toggle
      </p>

      <style>{`
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          .terminal-launcher-hint { display: none; }
        }
      `}</style>
    </motion.div>
  )
}
