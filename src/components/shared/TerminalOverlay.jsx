import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { data } from '../../data/portfolioData'

const HELP_LINES = [
  { text: '  Available commands:', color: 'var(--gold)' },
  { text: '  about       — Personal info', color: 'var(--text-code)' },
  { text: '  skills      — Technical skills', color: 'var(--text-code)' },
  { text: '  projects    — All projects + links', color: 'var(--text-code)' },
  { text: '  github      — Open GitHub profile', color: 'var(--text-code)' },
  { text: '  linkedin    — Open LinkedIn', color: 'var(--text-code)' },
  { text: '  resume      — Go to /resume', color: 'var(--text-code)' },
  { text: '  links       — Go to /links', color: 'var(--text-code)' },
  { text: '  clear       — Clear terminal', color: 'var(--text-code)' },
  { text: '  exit/close  — Close terminal', color: 'var(--text-code)' },
]

const INITIAL_LINES = [
  { text: 'PARTH_SAMARTH_OS v2026.03', color: 'var(--gold)' },
  { text: '─────────────────────────────────────────', color: 'var(--gold-dim)' },
  { text: "Type 'help' to see available commands.", color: 'var(--text-code)' },
  { text: '', color: '' },
]

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [outputLines, setOutputLines] = useState(INITIAL_LINES)
  const outputRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return
      if (e.key === '`') { setIsOpen(prev => !prev); e.preventDefault() }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [outputLines])

  const addLines = (lines) => {
    lines.forEach((line, i) => {
      setTimeout(() => setOutputLines(prev => [...prev, line]), i * 30)
    })
  }

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const echo = { text: `$ ${cmd}`, color: 'var(--text-muted)' }

    if (trimmed === 'help') {
      addLines([echo, ...HELP_LINES, { text: '', color: '' }])
    } else if (trimmed === 'about') {
      addLines([echo,
        { text: `  Name:       ${data.personal.name}`, color: 'var(--text-code)' },
        { text: `  Role:       ${data.personal.role}`, color: 'var(--text-code)' },
        { text: `  University: ${data.personal.university}`, color: 'var(--text-code)' },
        { text: `  CGPA:       ${data.personal.cgpa}`, color: 'var(--gold)' },
        { text: `  Location:   ${data.personal.location}`, color: 'var(--text-code)' },
        { text: '', color: '' },
      ])
    } else if (trimmed === 'skills') {
      const lines = [echo]
      Object.entries(data.skills).forEach(([cat, skills]) => {
        lines.push({ text: `  ${cat}:`, color: 'var(--gold)' })
        lines.push({ text: `    ${skills.join(', ')}`, color: 'var(--text-code)' })
      })
      lines.push({ text: '', color: '' })
      addLines(lines)
    } else if (trimmed === 'projects') {
      addLines([echo,
        ...data.projects.map(p => ({
          text: `  [${p.id}] ${p.name}  ${p.github ? '→ ' + p.github : '→ private'}`,
          color: 'var(--text-code)',
        })),
        { text: '', color: '' },
      ])
    } else if (trimmed === 'github') {
      addLines([echo, { text: '  Opening GitHub...', color: 'var(--accent-blue)' }, { text: '', color: '' }])
      setTimeout(() => window.open(data.personal.github, '_blank', 'noopener'), 200)
    } else if (trimmed === 'linkedin') {
      addLines([echo, { text: '  Opening LinkedIn...', color: 'var(--accent-blue)' }, { text: '', color: '' }])
      setTimeout(() => window.open(data.personal.linkedin, '_blank', 'noopener'), 200)
    } else if (trimmed === 'resume') {
      addLines([echo, { text: '  Navigating to /resume...', color: 'var(--accent-blue)' }, { text: '', color: '' }])
      setTimeout(() => { navigate('/resume'); setIsOpen(false) }, 800)
    } else if (trimmed === 'links') {
      addLines([echo, { text: '  Navigating to /links...', color: 'var(--accent-blue)' }, { text: '', color: '' }])
      setTimeout(() => { navigate('/links'); setIsOpen(false) }, 800)
    } else if (trimmed === 'clear') {
      setOutputLines([])
    } else if (trimmed === 'exit' || trimmed === 'close') {
      setIsOpen(false)
    } else if (trimmed === '') {
      addLines([echo])
    } else {
      addLines([echo, { text: `  Command not found: ${trimmed}. Type 'help' for commands.`, color: 'var(--accent-red)' }, { text: '', color: '' }])
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-overlay"
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, height: '65vh',
            zIndex: 500, background: 'rgba(10,12,10,0.97)',
            borderTop: '2px solid var(--gold)', backdropFilter: 'blur(4px)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--gold-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--gold)' }}>PARTH_OS v2026.03</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>— Type &apos;help&apos; for commands</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button onClick={() => setIsOpen(false)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 150ms' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >✕ close</button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>[esc]</span>
            </div>
          </div>

          {/* Output */}
          <div ref={outputRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
            {outputLines.map((line, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.7, color: line.color || 'var(--text-code)', minHeight: '1.4em' }}>
                {line.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--gold-border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--gold)', flexShrink: 0, marginRight: '0.5rem' }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleEnter}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-code)',
                caretColor: 'var(--gold)',
              }}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
