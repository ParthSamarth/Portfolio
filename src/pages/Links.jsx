import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone, FileText, Home, ChevronRight, Link } from 'lucide-react'

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  duration: 10 + Math.random() * 10,
  delay: Math.random() * 8,
}))

const linkItems = [
  { Icon: Home,     label: 'Portfolio',       sub: 'Projects · Work · Case Studies', internal: '/' },
  { Icon: FileText, label: 'Resume / CV',     sub: 'View & download full resume',    internal: '/resume' },
  { Icon: Github,   label: 'GitHub',          sub: 'github.com/ParthSamarth',        external: 'https://github.com/ParthSamarth' },
  { Icon: Linkedin, label: 'LinkedIn',        sub: 'Connect professionally',          external: 'https://linkedin.com/in/parth-samarth-43b774306' },
  { Icon: Mail,     label: 'Email Me',        sub: 'parthsamarth33@gmail.com',        external: 'mailto:parthsamarth33@gmail.com' },
  { Icon: Phone,    label: 'Call / WhatsApp', sub: '+91-8935973824',                  external: 'tel:+918935973824' },
]

export default function Links() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
            background: 'var(--gold)', opacity: 0.3,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }} />
        ))}
      </div>

      {/* Back link */}
      <div
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 10,
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)',
          cursor: 'pointer', transition: 'color 150ms',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >← PORTFOLIO</div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '420px', maxWidth: 'calc(100vw - 2rem)',
          background: 'var(--bg-card)', border: '1px solid var(--gold-border)',
          borderRadius: '16px', boxShadow: 'var(--shadow-gold)',
          padding: '2.5rem 2rem', position: 'relative', zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          {/* Avatar */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'var(--bg-elevated)', border: '2px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)' }}>PS</span>
          </div>
          {/* Badge */}
          <div style={{
            display: 'inline-block', marginTop: '0.5rem',
            border: '1px solid var(--gold-border)', borderRadius: '12px',
            padding: '3px 10px', background: 'var(--gold-trace)',
            fontFamily: 'var(--font-label)', fontSize: '0.68rem', color: 'var(--text-muted)',
          }}>✦ PORTFOLIO 2026</div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text)', marginTop: '0.75rem' }}>Parth Samarth</div>
          <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Software Developer · Data Scientist</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>B.Tech CSE · CV Raman Global University · CGPA 8.92</div>

          {/* Status chip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '0.75rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'pulse-dot 2s infinite', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-label)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Open to Internships &amp; Collaborations</span>
          </div>

          <div style={{ height: '1px', background: 'var(--gold-border)', margin: '1.25rem 0' }} />
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {linkItems.map(({ Icon, label, sub, internal, external }, i) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -2, borderColor: 'rgba(201,168,76,0.6)' }}
              onClick={() => internal ? navigate(internal) : window.open(external, external.startsWith('tel') || external.startsWith('mailto') ? '_self' : '_blank', 'noopener')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0',
                background: 'var(--bg-elevated)', border: '1px solid var(--gold-border)',
                borderRadius: '10px', padding: '0.85rem 1rem', width: '100%', cursor: 'pointer',
                textAlign: 'left', transition: 'background 200ms, border-color 200ms',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-trace)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} style={{ color: 'var(--gold)' }} />
              </div>
              <div style={{ flex: 1, paddingLeft: '0.75rem' }}>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{sub}</div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ height: '1px', background: 'var(--gold-border)', margin: '1.25rem 0 1rem' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
          {[
            { Icon: Github, href: 'https://github.com/ParthSamarth' },
            { Icon: Linkedin, href: 'https://linkedin.com/in/parth-samarth-43b774306' },
            { Icon: Mail, href: 'mailto:parthsamarth33@gmail.com' },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 150ms' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            ><Icon size={20} /></a>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          © 2026 Parth Samarth
        </div>
      </motion.div>

      <style>{`
        @keyframes float-up {
          from { transform: translateY(0); opacity: 0.3; }
          to   { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
