import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_COMMANDS = [
  'ls', 'whoami', 'about', 'skills', 'projects', 'education', 'certs',
  'contact', 'stats', 'resume', 'links', 'github', 'linkedin', 'open',
  'man', 'history', 'clear', 'exit', 'q', 'quit',
]

const WELCOME_LINES = [
  { text: 'PARTH_SAMARTH_OS  v2026.03  [x86_64 · React]', color: 'var(--gold-mid)' },
  { text: '──────────────────────────────────────────────────', color: 'rgba(224,172,16,0.18)' },
  { text: 'Welcome. Type  ls  to see available commands.', color: 'var(--text-code)' },
  { text: 'Type  man <command>  for detailed usage of any command.', color: 'var(--text-muted)' },
  { text: '', color: '' },
]

const RETURNING_LINES = [
  { text: 'parth@portfolio:~$  (type ls for commands)', color: 'var(--text-muted)' },
  { text: '', color: '' },
]

// ─── Command Definitions ──────────────────────────────────────────────────────

const CMD = {
  ls: () => [
    { text: 'Available commands:', color: 'var(--gold-mid)' },
    { text: '──────────────────────────────────────────────', color: 'rgba(224,172,16,0.15)' },
    { text: '  ls                List all commands (you are here)', color: 'var(--text-code)' },
    { text: '  whoami            Who is Parth Samarth', color: 'var(--text-code)' },
    { text: '  about             Full bio and background', color: 'var(--text-code)' },
    { text: '  skills            Technical skill set', color: 'var(--text-code)' },
    { text: '  projects          All 5 projects with links', color: 'var(--text-code)' },
    { text: '  education         Academic history', color: 'var(--text-code)' },
    { text: '  certs             Certifications', color: 'var(--text-code)' },
    { text: '  contact           Contact information', color: 'var(--text-code)' },
    { text: '  resume            Open the resume page', color: 'var(--text-code)' },
    { text: '  links             Open the social links page', color: 'var(--text-code)' },
    { text: '  github            Open GitHub profile', color: 'var(--text-code)' },
    { text: '  linkedin          Open LinkedIn profile', color: 'var(--text-code)' },
    { text: '  open <1-5>        Open a project\'s GitHub repo', color: 'var(--text-code)' },
    { text: '  stats             Academic & project stats', color: 'var(--text-code)' },
    { text: '  man <command>     Detailed help for a command', color: 'var(--text-code)' },
    { text: '  history           Show command history', color: 'var(--text-code)' },
    { text: '  clear             Clear the terminal', color: 'var(--text-code)' },
    { text: '  exit              Close the terminal', color: 'var(--text-code)' },
    { text: '', color: '' },
  ],

  whoami: () => [
    { text: 'Parth Samarth', color: 'var(--gold-mid)' },
    { text: 'Software Developer & Aspiring Data Scientist', color: 'var(--text-code)' },
    { text: 'B.Tech CSE · CV Raman Global University', color: 'var(--text-code)' },
    { text: 'CGPA: 8.92  ·  Top 20% in Branch', color: 'var(--text-code)' },
    { text: 'Jharkhand, India  ·  IST (UTC+5:30)', color: 'var(--text-muted)' },
    { text: '', color: '' },
  ],

  about: () => [
    { text: '// about.py', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: '3rd-year B.Tech CSE student building at the intersection', color: 'var(--text-code)' },
    { text: 'of software engineering and machine learning.', color: 'var(--text-code)' },
    { text: '', color: '' },
    { text: 'My work spans time-series forecasting, AI search algorithms,', color: 'var(--text-code)' },
    { text: 'ML classification models, BI dashboards, and Android apps.', color: 'var(--text-code)' },
    { text: '', color: '' },
    { text: 'Passions:', color: 'var(--gold-mid)' },
    { text: '  AI / ML  ·  Data Science  ·  Open Source', color: 'var(--text-code)' },
    { text: '  Competitive Programming  ·  Cybersecurity  ·  Chess', color: 'var(--text-code)' },
    { text: '', color: '' },
    { text: '  → Type  projects  or  skills  for more.', color: 'var(--text-muted)' },
    { text: '', color: '' },
  ],

  skills: () => [
    { text: '// skills.py', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: 'Languages       Python  Java  JavaScript  C  Kotlin', color: 'var(--text-code)' },
    { text: 'Web             HTML5  CSS3  React.js', color: 'var(--text-code)' },
    { text: 'Data & ML       Pandas  NumPy  Scikit-learn  TensorFlow', color: 'var(--text-code)' },
    { text: '                Keras  Statsmodels  Matplotlib  Seaborn', color: 'var(--text-code)' },
    { text: 'ML Techniques   Regression  Classification  Clustering', color: 'var(--text-code)' },
    { text: '                SVM  Decision Trees  Random Forest  ARIMA', color: 'var(--text-code)' },
    { text: 'BI & Analytics  Power BI  Tableau', color: 'var(--text-code)' },
    { text: 'Databases       SQL  SQLite  MySQL', color: 'var(--text-code)' },
    { text: 'Tools           Git  GitHub  Android SDK  Jupyter', color: 'var(--text-code)' },
    { text: '                VS Code  Google Colab  Pygame', color: 'var(--text-code)' },
    { text: '', color: '' },
    { text: '  → Type  projects  to see these skills in action.', color: 'var(--text-muted)' },
    { text: '', color: '' },
  ],

  projects: () => [
    { text: '// projects.py — 5 projects', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: '[01]  N-Puzzle Solver', color: 'var(--gold-mid)' },
    { text: '      AI Search + Python GUI · A* & Best-First Search', color: 'var(--text-code)' },
    { text: '      github.com/ParthSamarth/N-puzzle-problem', color: 'var(--accent-blue)' },
    { text: '', color: '' },
    { text: '[02]  Sales Forecasting', color: 'var(--gold-mid)' },
    { text: '      ARIMA & Neural Network Time-Series Models', color: 'var(--text-code)' },
    { text: '      github.com/ParthSamarth/Sales-Forecasting', color: 'var(--accent-blue)' },
    { text: '', color: '' },
    { text: '[03]  Interactive BI Suite', color: 'var(--gold-mid)' },
    { text: '      Tableau & Power BI Dashboards · Live KPI tracking', color: 'var(--text-code)' },
    { text: '      github.com/ParthSamarth/Interactive-BI-Suite', color: 'var(--accent-blue)' },
    { text: '', color: '' },
    { text: '[04]  Health Risk Predictor', color: 'var(--gold-mid)' },
    { text: '      SVM + Random Forest + Clustering Pipeline', color: 'var(--text-code)' },
    { text: '      github.com/ParthSamarth/Health-Risk-Predictor', color: 'var(--accent-blue)' },
    { text: '', color: '' },
    { text: '[05]  Student Management System', color: 'var(--gold-mid)' },
    { text: '      Android App · Kotlin · SQLite · Material Design', color: 'var(--text-code)' },
    { text: '      [private repository]', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: '  → Type  open <1-5>  to launch a project\'s GitHub.', color: 'var(--text-muted)' },
    { text: '', color: '' },
  ],

  education: () => [
    { text: '// education.py', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: '┌─────────────────────────────────────────────────┐', color: 'var(--gold-dim)' },
    { text: '│  CV Raman Global University · Bhubaneswar       │', color: 'var(--gold-mid)' },
    { text: '│  B.Tech — Computer Science & Engineering        │', color: 'var(--text-code)' },
    { text: '│  2023 – Present  ·  CGPA: 8.92  ·  Top 20%     │', color: 'var(--text-code)' },
    { text: '│  Sem 5 SGPA: 9.30                               │', color: 'var(--text-code)' },
    { text: '└─────────────────────────────────────────────────┘', color: 'var(--gold-dim)' },
    { text: '         ↓', color: 'var(--text-muted)' },
    { text: '  Oasis School, Hazaribagh  ·  Class XII  ·  2023  ·  72%', color: 'var(--text-code)' },
    { text: '         ↓', color: 'var(--text-muted)' },
    { text: '  St. Clare\'s School  ·  Class X  ·  2021  ·  89%', color: 'var(--text-code)' },
    { text: '', color: '' },
  ],

  certs: () => [
    { text: '// certifications.py — 3 certificates', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: '[1]  Network Security Fundamentals', color: 'var(--gold-mid)' },
    { text: '     Palo Alto Networks · Coursera · Sep 28, 2025', color: 'var(--text-code)' },
    { text: '', color: '' },
    { text: '[2]  Cybersecurity Tools & Cyberattacks', color: 'var(--gold-mid)' },
    { text: '     IBM · Coursera · Sep 30, 2025', color: 'var(--text-code)' },
    { text: '', color: '' },
    { text: '[3]  Innovation By Design', color: 'var(--gold-mid)' },
    { text: '     IIT Bombay · NPTEL · 2025', color: 'var(--text-code)' },
    { text: '', color: '' },
  ],

  contact: () => [
    { text: '// contact.py', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: 'email      parthsamarth33@gmail.com', color: 'var(--text-code)' },
    { text: 'phone      +91-8935973824', color: 'var(--text-code)' },
    { text: 'linkedin   linkedin.com/in/parth-samarth-43b774306', color: 'var(--accent-blue)' },
    { text: 'github     github.com/ParthSamarth', color: 'var(--accent-blue)' },
    { text: 'location   Jharkhand, India  (IST · UTC+5:30)', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: '  → Type  github  or  linkedin  to open in browser.', color: 'var(--text-muted)' },
    { text: '', color: '' },
  ],

  stats: () => [
    { text: '// stats.py', color: 'var(--text-muted)' },
    { text: '', color: '' },
    { text: 'CGPA          ████████████████████  8.92 / 10', color: 'var(--text-code)' },
    { text: 'Sem 5 SGPA    ████████████████████  9.30 / 10', color: 'var(--text-code)' },
    { text: 'Class X       ████████████████████  89%', color: 'var(--text-code)' },
    { text: 'Class XII     ██████████████░░░░░░  72%', color: 'var(--text-code)' },
    { text: 'Projects      ████████████████████  5+', color: 'var(--text-code)' },
    { text: 'Certs         ██████████████░░░░░░  3', color: 'var(--text-code)' },
    { text: 'Branch Rank   ████████████████████  Top 20%', color: 'var(--text-code)' },
    { text: '', color: '' },
  ],
}

// ─── Man pages ────────────────────────────────────────────────────────────────

const MAN_PAGES = {
  ls: [
    { text: 'COMMAND: ls', color: 'var(--gold-mid)' },
    { text: 'Lists all available terminal commands with brief descriptions.', color: 'var(--text-code)' },
    { text: 'This is the primary discovery mechanism for the terminal.', color: 'var(--text-muted)' },
  ],
  whoami: [
    { text: 'COMMAND: whoami', color: 'var(--gold-mid)' },
    { text: 'Prints a quick identity snapshot: name, role, university, CGPA, location.', color: 'var(--text-code)' },
  ],
  about: [
    { text: 'COMMAND: about', color: 'var(--gold-mid)' },
    { text: 'Full bio: background, project domains, and personal interests.', color: 'var(--text-code)' },
    { text: 'Example:  about', color: 'var(--text-muted)' },
  ],
  skills: [
    { text: 'COMMAND: skills', color: 'var(--gold-mid)' },
    { text: 'Lists the complete technical skill set by category.', color: 'var(--text-code)' },
    { text: 'Categories: Languages, Web, Data & ML, Databases, Tools.', color: 'var(--text-muted)' },
  ],
  projects: [
    { text: 'COMMAND: projects', color: 'var(--gold-mid)' },
    { text: 'Lists all 5 projects with their stack and GitHub links.', color: 'var(--text-code)' },
    { text: 'Use  open <n>  to launch a specific project repo.', color: 'var(--text-code)' },
    { text: 'Example:  open 2  →  opens Sales Forecasting repo', color: 'var(--text-muted)' },
  ],
  open: [
    { text: 'COMMAND: open <1-5>', color: 'var(--gold-mid)' },
    { text: 'Opens a project\'s GitHub repository in a new tab.', color: 'var(--text-code)' },
    { text: 'Example:  open 1  →  N-Puzzle Solver', color: 'var(--text-muted)' },
    { text: '          open 4  →  Health Risk Predictor', color: 'var(--text-muted)' },
  ],
  education: [
    { text: 'COMMAND: education', color: 'var(--gold-mid)' },
    { text: 'Displays the full academic history in chronological order.', color: 'var(--text-code)' },
    { text: 'Includes B.Tech, Class XII, and Class X records.', color: 'var(--text-muted)' },
  ],
  certs: [
    { text: 'COMMAND: certs', color: 'var(--gold-mid)' },
    { text: 'Lists all professional certifications earned so far.', color: 'var(--text-code)' },
    { text: '3 certs from Coursera (Palo Alto, IBM) and NPTEL (IIT Bombay).', color: 'var(--text-muted)' },
  ],
  contact: [
    { text: 'COMMAND: contact', color: 'var(--gold-mid)' },
    { text: 'Shows email, phone, LinkedIn, GitHub, and location.', color: 'var(--text-code)' },
    { text: 'Use  github  or  linkedin  to open those profiles directly.', color: 'var(--text-muted)' },
  ],
  stats: [
    { text: 'COMMAND: stats', color: 'var(--gold-mid)' },
    { text: 'Displays academic and project statistics as ASCII bar charts.', color: 'var(--text-code)' },
  ],
  resume: [
    { text: 'COMMAND: resume', color: 'var(--gold-mid)' },
    { text: 'Navigates to the /resume page and closes the terminal.', color: 'var(--text-code)' },
  ],
  links: [
    { text: 'COMMAND: links', color: 'var(--gold-mid)' },
    { text: 'Navigates to the /links page and closes the terminal.', color: 'var(--text-code)' },
  ],
  github: [
    { text: 'COMMAND: github', color: 'var(--gold-mid)' },
    { text: 'Opens github.com/ParthSamarth in a new browser tab.', color: 'var(--text-code)' },
  ],
  linkedin: [
    { text: 'COMMAND: linkedin', color: 'var(--gold-mid)' },
    { text: 'Opens linkedin.com/in/parth-samarth-43b774306 in a new tab.', color: 'var(--text-code)' },
  ],
  history: [
    { text: 'COMMAND: history', color: 'var(--gold-mid)' },
    { text: 'Shows the last 10 commands you typed in this session.', color: 'var(--text-code)' },
    { text: 'Use ↑ / ↓ arrow keys to navigate history inline.', color: 'var(--text-muted)' },
  ],
  clear: [
    { text: 'COMMAND: clear', color: 'var(--gold-mid)' },
    { text: 'Clears all terminal output. A fresh slate.', color: 'var(--text-code)' },
  ],
  exit: [
    { text: 'COMMAND: exit / q / quit', color: 'var(--gold-mid)' },
    { text: 'Closes the terminal overlay. Press Escape or ` to toggle it.', color: 'var(--text-code)' },
  ],
  man: [
    { text: 'COMMAND: man <command>', color: 'var(--gold-mid)' },
    { text: 'Prints a detailed description of any command.', color: 'var(--text-code)' },
    { text: 'Example:  man projects', color: 'var(--text-muted)' },
  ],
}

// ─── Project URLs ─────────────────────────────────────────────────────────────

const PROJECT_URLS = {
  1: 'https://github.com/ParthSamarth/N-puzzle-problem',
  2: 'https://github.com/ParthSamarth/Sales-Forecasting',
  3: 'https://github.com/ParthSamarth/Interactive-BI-Suite',
  4: 'https://github.com/ParthSamarth/Health-Risk-Predictor',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TerminalOverlay({ isOpen, onClose }) {
  const navigate = useNavigate()

  // Initialise output with welcome or returning message based on sessionStorage
  const getInitialLines = () => {
    if (sessionStorage.getItem('terminalWelcomeShown')) return RETURNING_LINES
    sessionStorage.setItem('terminalWelcomeShown', '1')
    return WELCOME_LINES
  }

  const [input, setInput] = useState('')
  const [outputLines, setOutputLines] = useState(getInitialLines)
  const historyRef = useRef([])
  const historyIndexRef = useRef(-1)
  const outputEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [isOpen])

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [outputLines])

  // ── appendLines: staggered reveal ──
  const appendLines = (lines) => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setOutputLines(prev => [...prev, line])
      }, i * 22)
    })
  }

  // ── processCommand ──
  const processCommand = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) {
      appendLines([{ text: 'parth@portfolio:~$ ', color: 'var(--gold-dim)' }])
      return
    }

    const echo = { text: `parth@portfolio:~$ ${trimmed}`, color: 'var(--gold-dim)' }
    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Push to history (newest first)
    historyRef.current.unshift(trimmed)
    historyIndexRef.current = -1

    // ── Dispatch ──────────────────────────────────────────────
    if (cmd === 'clear') {
      setOutputLines([])
      return
    }

    if (cmd === 'exit' || cmd === 'q' || cmd === 'quit' || cmd === 'close') {
      appendLines([echo])
      setTimeout(() => onClose(), 200)
      return
    }

    if (cmd === 'resume') {
      appendLines([echo, { text: '→ Opening resume page...', color: 'var(--gold-mid)' }])
      setTimeout(() => { navigate('/resume'); onClose() }, 400)
      return
    }

    if (cmd === 'links') {
      appendLines([echo, { text: '→ Opening social links page...', color: 'var(--gold-mid)' }])
      setTimeout(() => { navigate('/links'); onClose() }, 400)
      return
    }

    if (cmd === 'github') {
      window.open('https://github.com/ParthSamarth', '_blank', 'noopener,noreferrer')
      appendLines([echo, { text: '→ Opening github.com/ParthSamarth in new tab...', color: 'var(--gold-mid)' }, { text: '', color: '' }])
      return
    }

    if (cmd === 'linkedin') {
      window.open('https://linkedin.com/in/parth-samarth-43b774306', '_blank', 'noopener,noreferrer')
      appendLines([echo, { text: '→ Opening LinkedIn profile in new tab...', color: 'var(--gold-mid)' }, { text: '', color: '' }])
      return
    }

    if (cmd === 'open') {
      const n = parseInt(args[0])
      if (isNaN(n) || n < 1 || n > 5) {
        appendLines([echo, { text: 'Usage: open <1-5>   e.g.  open 2', color: 'var(--accent-red)' }, { text: '', color: '' }])
        return
      }
      if (n === 5) {
        appendLines([echo, { text: 'Project [05] is a private repository.', color: 'var(--text-muted)' }, { text: '', color: '' }])
        return
      }
      window.open(PROJECT_URLS[n], '_blank', 'noopener,noreferrer')
      appendLines([echo, { text: `→ Opening project [0${n}] in new tab...`, color: 'var(--gold-mid)' }, { text: '', color: '' }])
      return
    }

    if (cmd === 'man') {
      if (!args[0]) {
        appendLines([echo, { text: 'Usage: man <command>   e.g.  man projects', color: 'var(--accent-red)' }, { text: '', color: '' }])
        return
      }
      const page = MAN_PAGES[args[0].toLowerCase()]
      if (page) {
        appendLines([echo, ...page, { text: '', color: '' }])
      } else {
        appendLines([echo, { text: `No manual entry for '${args[0]}'.`, color: 'var(--accent-red)' }, { text: '  Type  ls  to see all commands.', color: 'var(--text-muted)' }, { text: '', color: '' }])
      }
      return
    }

    if (cmd === 'history') {
      const hist = historyRef.current.slice(0, 10)
      if (hist.length === 0) {
        appendLines([echo, { text: 'No commands in history yet.', color: 'var(--text-muted)' }, { text: '', color: '' }])
      } else {
        appendLines([echo, ...hist.map((c, i) => ({ text: `  ${i + 1}  ${c}`, color: 'var(--text-muted)' })), { text: '', color: '' }])
      }
      return
    }

    // Static command table
    if (CMD[cmd]) {
      appendLines([echo, ...CMD[cmd]()])
      return
    }

    // Not found
    appendLines([
      echo,
      { text: `bash: ${trimmed}: command not found`, color: 'var(--accent-red)' },
      { text: 'Type  ls  to see available commands.', color: 'var(--text-muted)' },
      { text: '', color: '' },
    ])
  }

  // ── Key handler ──
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
      return
    }

    if (e.key === 'Escape') {
      onClose()
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(historyIndexRef.current + 1, historyRef.current.length - 1)
      historyIndexRef.current = newIndex
      setInput(historyRef.current[newIndex] || '')
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.max(historyIndexRef.current - 1, -1)
      historyIndexRef.current = newIndex
      setInput(newIndex === -1 ? '' : historyRef.current[newIndex])
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.trim()
      const matches = ALL_COMMANDS.filter(c => c.startsWith(partial))
      if (matches.length === 1) {
        setInput(matches[0] + ' ')
      } else if (matches.length > 1) {
        appendLines([
          { text: matches.join('   '), color: 'var(--text-code)' },
          { text: '', color: '' },
        ])
      }
    }
  }

  // ── Render ──
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-overlay"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '68vh',
            background: 'rgba(1, 8, 2, 0.97)',
            borderTop: '2px solid var(--gold-mid)',
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
          }}
          className="terminal-overlay-root"
        >
          {/* ── Header Bar ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '42px',
            flexShrink: 0,
            padding: '0 1.25rem',
            gap: '10px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderBottom: '1px solid rgba(224, 172, 16, 0.12)',
          }}>
            {/* Traffic-light dots */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
            </div>

            {/* Title */}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              flex: 1,
              textAlign: 'center',
            }}>
              parth@portfolio — zsh
            </span>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 150ms',
                flexShrink: 0,
                padding: '4px 0',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-mid)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              [ esc ] to close
            </button>
          </div>

          {/* ── Output Area ── */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem 1.5rem',
          }}>
            {outputLines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.8,
                  color: line.color || 'var(--text-code)',
                  minHeight: '1em',
                  whiteSpace: 'pre',
                }}
              >
                {line.text}
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          {/* ── Input Row ── */}
          <div style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            padding: '0.65rem 1.5rem',
            borderTop: '1px solid rgba(224, 172, 16, 0.10)',
            background: 'rgba(0, 0, 0, 0.3)',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--gold-mid)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              parth@portfolio:~$&nbsp;
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--text-code)',
                caretColor: 'var(--gold-bright)',
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </motion.div>
      )}

      {/* Mobile + responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .terminal-overlay-root {
            height: 80vh !important;
          }
          .terminal-overlay-root input {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  )
}
