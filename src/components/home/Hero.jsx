import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line } from 'recharts'
import { data } from '../../data/portfolioData'
import { useTypewriter } from '../../hooks/useTypewriter'

const floatingChips = [
  { text: 'model.fit(X_train, y_train)', top: '10%', right: '2%', rotate: '-2deg', duration: '6s', delay: '0s' },
  { text: 'A* + Manhattan Distance',    top: '15%', left: '2%', rotate: '2deg',  duration: '8s', delay: '1s' },
  { text: 'SELECT * FROM insights',     bottom: '20%', right: '2%', rotate: '-3deg', duration: '7s', delay: '2s' },
  { text: 'accuracy: 0.92 ✓',          bottom: '25%', left: '2%', rotate: '1deg',  duration: '9s', delay: '0.5s' },
]

const Hero = React.memo(function Hero() {
  const typed = useTypewriter(data.personal.taglines, 75, 35, 2200)
  const navigate = useNavigate()
  const [chartOffset, setChartOffset] = useState(1000)
  const nameLetters1 = 'PARTH'.split('')
  const nameLetters2 = 'SAMARTH'.split('')

  useEffect(() => {
    const t = setTimeout(() => setChartOffset(0), 200)
    return () => clearTimeout(t)
  }, [])

  const scrollToWork = () => {
    const el = document.querySelector('#work')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '80px clamp(1.5rem, 5vw, 4rem) 0',
      scrollMarginTop: '80px',
    }}>
      <div style={{ display: 'flex', width: '100%', gap: '2rem', alignItems: 'center' }} className="hero-row">
        <div style={{ flex: '0 0 55%' }} className="hero-left">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="badge-available"
            style={{ marginBottom: '1.5rem' }}
          >
            <span className="dot" />
            Open to Internships &amp; Research Collaborations
          </motion.div>

          {/* Terminal label */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-code)', marginBottom: '1rem' }}
          >
            $ whoami
          </motion.div>

          {/* Name */}
          <h1 style={{ margin: 0, lineHeight: 1.05, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
            <div style={{ willChange: 'transform, opacity' }}>
              {nameLetters1.map((l, i) => (
                <motion.span key={i} style={{ color: 'var(--text)', display: 'inline-block' }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
                >{l}</motion.span>
              ))}
            </div>
            <div style={{ willChange: 'transform, opacity' }}>
              {nameLetters2.map((l, i) => (
                <motion.span key={i} style={{ color: 'var(--gold)', display: 'inline-block' }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (nameLetters1.length + i) * 0.04, duration: 0.5 }}
                >{l}</motion.span>
              ))}
            </div>
          </h1>

          {/* Typewriter */}
          <div style={{ minHeight: '2rem', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-label)', fontSize: '1.25rem', color: 'var(--gold)' }}>{typed}</span>
            <span style={{ color: 'var(--gold)', animation: 'cursor-blink 0.7s steps(1) infinite' }}>|</span>
          </div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', flexWrap: 'wrap' }}
          >
            3rd Year B.Tech · CSE · CGPA 8.92 · CV Raman Global University · Jharkhand
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}
          >
            {data.stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div style={{ width: '1px', height: '2rem', background: 'var(--gold-border)' }} />}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 + i * 0.1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 700 }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {stat.label}
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <button onClick={scrollToWork} style={{
              background: 'var(--gold)', color: '#0A0A0A', fontFamily: 'var(--font-label)',
              fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.08em',
              padding: '12px 28px', borderRadius: '4px', border: 'none', cursor: 'pointer',
              transition: 'background 200ms, box-shadow 200ms, transform 200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-bright)'; e.currentTarget.style.boxShadow = 'var(--shadow-gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
            >VIEW WORK →</button>

            <button onClick={() => navigate('/resume')} style={{
              background: 'transparent', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
              border: '1px solid var(--gold-border)', padding: '11px 24px', borderRadius: '4px', cursor: 'pointer',
              transition: 'border-color 200ms, background 200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border-hot)'; e.currentTarget.style.background = 'var(--gold-trace)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.background = 'transparent' }}
            >/ RESUME</button>

            <button onClick={() => navigate('/links')} style={{
              background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              border: 'none', padding: '11px 8px', cursor: 'pointer', transition: 'color 200ms',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >LINKS ↗</button>
          </motion.div>

          {/* Social strip */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ marginTop: '2.5rem', borderTop: '1px solid var(--gold-border)', borderBottom: '1px solid var(--gold-border)', padding: '0.75rem 0' }}
          >
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { Icon: Github, text: 'github.com/ParthSamarth', href: 'https://github.com/ParthSamarth' },
                { Icon: Linkedin, text: 'linkedin.com/in/parth-samarth', href: 'https://linkedin.com/in/parth-samarth-43b774306' },
                { Icon: Mail, text: 'parthsamarth33@gmail.com', href: 'mailto:parthsamarth33@gmail.com' },
              ].map(({ Icon, text, href }) => (
                <a key={text} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Icon size={16} /> {text}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--gold-border)' }}
          >
            <span style={{
              display: 'block', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase'
            }}>
              Affiliated With
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0', alignItems: 'center' }}>
              {["CGU Bhubaneswar", "IIT Bombay", "Palo Alto Networks", "IBM", "Coursera"].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <span
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', transition: 'color 150ms' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {item}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: 'var(--gold-dim)', margin: '0 0.5rem', fontSize: '0.72rem' }}>·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: '0 0 45%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="hero-right">
          {/* Background glow */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }} />

          {/* Chart */}
          <div style={{ width: '100%', willChange: 'opacity' }}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.accuracyCurve}>
                <Line
                  type="monotone" dataKey="y"
                  stroke="var(--gold)" strokeWidth={2} dot={false}
                  strokeDasharray="1000"
                  strokeDashoffset={chartOffset}
                  style={{ transition: 'stroke-dashoffset 2000ms ease-out' }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '0.5rem' }}>
              // model_accuracy_curve.py
            </div>
          </div>

          {/* Mini metric tiles */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ v: '0.031', l: 'MAE' }, { v: '0.047', l: 'RMSE' }, { v: '92%', l: 'ACCURACY' }].map(({ v, l }) => (
              <div key={l} style={{
                background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: '4px', padding: '8px 14px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--gold)' }}>{v}</div>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Floating chips */}
          {floatingChips.map((chip, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right,
              background: 'var(--bg-elevated)', border: '1px solid var(--gold-border)',
              borderRadius: '4px', padding: '5px 10px',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-code)',
              transform: `rotate(${chip.rotate})`, willChange: 'transform',
              animation: `float-chip ${chip.duration} ease-in-out ${chip.delay} infinite alternate`,
              zIndex: 2, whiteSpace: 'nowrap',
            }}>
              {chip.text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        animation: 'scroll-hint 1.5s ease-in-out infinite',
      }}>
        <div style={{ width: '2px', height: '32px', background: 'var(--gold)', borderRadius: '1px' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>scroll</div>
      </div>

      <style>{`
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float-chip {
          from { transform: translateY(0) rotate(var(--r, 0deg)); }
          to   { transform: translateY(-8px) rotate(var(--r, 0deg)); }
        }
        @keyframes scroll-hint {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 0.3; }
        }
        .hero-row { flex-direction: row; }
        @media (max-width: 900px) {
          .hero-row { flex-direction: column !important; }
          .hero-left { flex: unset !important; width: 100% !important; }
          .hero-right { flex: unset !important; width: 100% !important; }
          .hero-right [style*="position: absolute"] { display: none; }
        }
      `}</style>
    </section>
  )
})

export default Hero
