import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Link2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const items = [
  {
    Icon: Github,
    tooltip: 'github.com/ParthSamarth',
    href: 'https://github.com/ParthSamarth',
    external: true,
  },
  {
    Icon: Linkedin,
    tooltip: 'Connect on LinkedIn',
    href: 'https://linkedin.com/in/parth-samarth-43b774306',
    external: true,
  },
  {
    Icon: Mail,
    tooltip: 'parthsamarth33@gmail.com',
    href: 'mailto:parthsamarth33@gmail.com',
    external: false,
  },
  {
    Icon: Link2,
    tooltip: 'All Links → /links',
    href: '/links',
    external: false,
    internal: true,
  },
]

function SidebarItem({ Icon, tooltip, href, external, internal }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    if (internal) {
      navigate(href)
    } else if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = href
    }
  }

  return (
    <div
      style={{ position: 'relative', width: '44px', height: '44px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={handleClick}
        style={{
          width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', cursor: 'pointer',
          color: hovered ? 'var(--gold)' : 'var(--text-muted)',
          transform: hovered ? 'translateX(6px)' : 'translateX(0)',
          transition: 'color 200ms, transform 200ms',
        }}
      >
        <Icon size={16} />
      </button>
      {hovered && (
        <div style={{
          position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)',
          background: 'var(--bg-card)', border: '1px solid var(--gold-border)',
          borderRadius: '4px', padding: '4px 10px',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text)',
          whiteSpace: 'nowrap', pointerEvents: 'none',
          animation: 'tooltip-in 200ms ease-out forwards',
          marginLeft: '6px',
        }}>
          {tooltip}
        </div>
      )}
    </div>
  )
}

export default function SocialSidebar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const checkWidth = () => setVisible(window.innerWidth >= 1280)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  if (!visible) return null

  return (
    <>
      <motion.div
        initial={{ x: -44, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        style={{
          position: 'fixed', left: 0, top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50, width: '44px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        }}
      >
        {items.map((item, i) => (
          <SidebarItem key={i} {...item} />
        ))}

        {/* Divider */}
        <div style={{
          width: '28px', height: '1px',
          background: 'var(--gold-border)',
          margin: '6px 0',
        }} />

        {/* Vertical text */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--text-muted)', letterSpacing: '0.2em',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          marginTop: '4px',
        }}>
          CONNECT
        </div>
      </motion.div>

      <style>{`
        @keyframes tooltip-in {
          from { opacity: 0; transform: translateY(-50%) translateX(-4px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </>
  )
}
