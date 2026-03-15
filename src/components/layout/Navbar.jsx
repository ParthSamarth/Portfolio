import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Github, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollProgress'

const navLinks = [
  { id: 'about',  label: 'about',  prefix: '',  suffix: '()',  href: '#about' },
  { id: 'skills', label: 'skills', prefix: '',  suffix: '{}',  href: '#skills' },
  { id: 'work',   label: 'work',   prefix: '',  suffix: '[]',  href: '#work' },
  { id: 'data',   label: 'data',   prefix: '',  suffix: '~',   href: '#data-science' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const progress = useScrollProgress()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '64px',
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--gold-border)' : '1px solid transparent',
        transition: 'background 300ms, border-bottom 300ms',
      }}>
        {/* Scroll progress bar */}
        {isHome && (
          <div style={{
            position: 'absolute', top: 0, left: 0,
            height: '2px', background: 'var(--gold)',
            width: `${progress * 100}%`,
            transition: 'width 100ms linear',
          }} />
        )}

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
        >
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '1.1rem',
            color: 'var(--gold)', letterSpacing: '0.2em',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <span>PS</span>
            <span style={{
              maxWidth: '0', overflow: 'hidden',
              transition: 'max-width 400ms ease-out',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-label)', fontSize: '0.9rem', letterSpacing: '0.1em',
            }}
              className="logo-expanded"
              onMouseEnter={e => e.currentTarget.style.maxWidth = '16rem'}
              onMouseLeave={e => e.currentTarget.style.maxWidth = '0'}
            >
              PARTH SAMARTH
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '2rem',
          marginLeft: 'auto', marginRight: 'auto',
        }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--text-muted)', textDecoration: 'none',
                display: 'flex', alignItems: 'center',
                transition: 'color 150ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelectorAll('.nav-name')[0].style.color = 'var(--text)'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelectorAll('.nav-name')[0].style.color = 'var(--text-muted)'
              }}
            >
              <span style={{ color: 'var(--gold-dim)' }}>{link.prefix}</span>
              <span className="nav-name" style={{ color: 'var(--text-muted)', transition: 'color 150ms' }}>{link.label}</span>
              <span style={{ color: 'var(--gold-dim)' }}>{link.suffix}</span>
            </a>
          ))}
          <Link
            to="/resume"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
              color: 'var(--gold)', fontStyle: 'italic',
            }}
          >
            /resume
          </Link>
        </div>

        {/* Right side desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-right">
          <a
            href="https://github.com/ParthSamarth"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              border: '1px solid var(--gold-border)', padding: '6px 14px',
              borderRadius: '4px', fontFamily: 'var(--font-label)', fontSize: '0.8rem',
              color: 'var(--text)', transition: 'border-color 150ms, background 150ms',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold-border-hot)'
              e.currentTarget.style.background = 'var(--gold-trace)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--gold-border)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <Github size={14} /> GitHub
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="availability-dot" />
            <span style={{ fontFamily: 'var(--font-label)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available</span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          style={{ marginLeft: 'auto', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(8,8,8,0.97)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2rem',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.5rem',
                color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  fontFamily: 'var(--font-label)', fontSize: '1.5rem',
                  color: 'var(--text)', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '2px',
                }}
              >
                <span style={{ color: 'var(--gold-dim)' }}>{link.prefix}</span>
                {link.label}
                <span style={{ color: 'var(--gold-dim)' }}>{link.suffix}</span>
              </motion.a>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Link
                to="/resume"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '1.2rem',
                  color: 'var(--gold)', fontStyle: 'italic',
                }}
              >
                /resume
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.36 }}>
              <Link
                to="/links"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '1rem',
                  color: 'var(--text-muted)',
                }}
              >
                /links
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}
            >
              <a href="https://github.com/ParthSamarth" target="_blank" rel="noopener noreferrer">
                <Github size={22} color="var(--gold)" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .availability-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-right { display: none !important; }
        }
      `}</style>
    </>
  )
}
