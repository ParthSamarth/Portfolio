import { Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--gold-border)',
      padding: '2rem clamp(1.5rem, 5vw, 4rem)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        {/* Left — monogram */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold)' }}>PS</div>
          <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            PARTH SAMARTH
          </div>
        </div>

        {/* Center */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Built with React &amp; Vite · Deployed on GitHub Pages
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '4px',
          }}>
            [ press <span className="footer-backtick">`</span> to open terminal ]
          </div>
        </div>

        {/* Right — icon links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="https://github.com/ParthSamarth" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', transition: 'color 150ms' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          ><Github size={18} /></a>
          <a href="https://linkedin.com/in/parth-samarth-43b774306" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', transition: 'color 150ms' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          ><Linkedin size={18} /></a>
          <a href="mailto:parthsamarth33@gmail.com"
            style={{ color: 'var(--text-muted)', transition: 'color 150ms' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          ><Mail size={18} /></a>
          <Link to="/links"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--text-muted)', transition: 'color 150ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >↗ /links</Link>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        textAlign: 'center', marginTop: '1.5rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
      }}>
        © 2026 Parth Samarth · All rights reserved
      </div>

      <style>{`
        .footer-backtick {
          animation: blink-backtick 1s infinite;
        }
        @keyframes blink-backtick {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 640px) {
          footer > div:first-child {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
