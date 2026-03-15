import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { data } from '../../data/portfolioData'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

const terminalLines = [
  { prefix: '>>> ', key: 'name',     code: 'name = ',     value: '"Parth Samarth"',             valueColor: '#ce9178' },
  { prefix: '>>> ', key: 'role',     code: 'role = ',     value: '["Software Developer", "Data Scientist"]', valueColor: 'var(--text)' },
  { prefix: '>>> ', key: 'cgpa',     code: 'cgpa = ',     value: '8.92',                        valueColor: 'var(--gold)' },
  { prefix: '>>> ', key: 'pass',     code: 'passions = ', value: '["AI/ML", "Open Source", "Cybersecurity"]', valueColor: 'var(--text)' },
  { prefix: '>>> ', key: 'print',    code: 'print(about_me())' },
  { prefix: '',     key: 'divider',  code: '─────────────────────────────', isDivider: true },
  { prefix: '',     key: 'bio',      code: 'Building at the intersection of code and intelligence.', isBio: true },
]

const pieData = [
  { name: 'Python', value: 40 }, { name: 'JavaScript', value: 25 },
  { name: 'Kotlin', value: 20 }, { name: 'Java', value: 15 },
]
const pieColors = ['var(--gold)', 'var(--gold-dim)', '#3a3025', '#1e1a0f']
const pieLabels = [{ l: 'Python', pct: '40%' }, { l: 'JavaScript', pct: '25%' }, { l: 'Kotlin', pct: '20%' }, { l: 'Java', pct: '15%' }]

const domainBars = [
  { label: 'AI / ML', pct: 85 }, { label: 'Data Sci', pct: 80 },
  { label: 'Web Dev', pct: 55 }, { label: 'Mobile',   pct: 45 },
]

const semScores = [8.5, 8.6, 8.7, 8.82, 8.92]

function StatCard({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }} viewport={{ once: true }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--gold-border)',
        borderRadius: '8px', padding: '1.25rem',
        transition: 'border-color 200ms, box-shadow 200ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border-hot)'; e.currentTarget.style.boxShadow = 'var(--shadow-gold)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        {title}
      </div>
      <div style={{ height: '1px', background: 'var(--gold-border)', marginBottom: '0.75rem' }} />
      {children}
    </motion.div>
  )
}

const About = React.memo(function About() {
  const [sectionRef, inView] = useInView()
  const [visibleLines, setVisibleLines] = useState(0)
  const [cgpaRef, cgpaVal] = useCountUp(8.92, 1500, 2)
  const [certRef, certVal] = useCountUp(3, 1000, 0)
  const [barsVisible, setBarsVisible] = useState(false)
  const [barsRef, barsInView] = useInView()

  useEffect(() => { if (inView && visibleLines < terminalLines.length) {
    const t = setInterval(() => { setVisibleLines(v => { if (v >= terminalLines.length) { clearInterval(t); return v } return v + 1 }) }, 120)
    return () => clearInterval(t)
  }}, [inView])

  useEffect(() => { if (barsInView) setBarsVisible(true) }, [barsInView])

  return (
    <section id="about" style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', scrollMarginTop: '80px' }}>
      <div ref={sectionRef}>
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-label)',fontSize:'0.8rem',color:'var(--gold)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.5rem' }}>
          // ABOUT ME
        </motion.div>
        <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,3.5vw,2.6rem)',color:'var(--text)',margin:'0 0 2.5rem' }}>
          Crafting <span style={{ color:'var(--gold)' }}>Intelligence</span>,<br />One Line at a Time.
        </motion.h2>
      </div>

      <div style={{ display:'flex', gap:'4rem', alignItems:'flex-start', flexWrap:'wrap' }}>
        {/* LEFT */}
        <div style={{ flex:'1 1 400px', minWidth:'300px' }}>
          {/* Terminal */}
          <div style={{ background:'var(--bg-terminal)', border:'1px solid var(--gold-border)', borderRadius:'8px', overflow:'hidden' }}>
            <div style={{ background:'#1a1a1a', padding:'10px 16px', display:'flex', gap:'8px', alignItems:'center' }}>
              {['#FF5F57','#FFBD2E','#28CA41'].map(c => <div key={c} style={{ width:'6px',height:'6px',borderRadius:'50%',background:c }} />)}
              <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-muted)',marginLeft:'8px' }}>
                parth@cgu:~$ python about.py
              </span>
            </div>
            <div style={{ padding:'1.5rem', fontFamily:'var(--font-mono)', fontSize:'0.82rem', lineHeight:1.8 }}>
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={line.key} style={{ display:'flex', alignItems:'flex-start', gap:'2px' }}>
                  <span style={{ color:'var(--gold-dim)' }}>{line.prefix}</span>
                  {line.isDivider ? <span style={{ color:'var(--text-muted)' }}>{line.code}</span>
                    : line.isBio ? <span style={{ color:'var(--text)' }}>{line.code}</span>
                    : line.key === 'print' ? <span style={{ color:'var(--text-code)' }}>{line.code}</span>
                    : <>
                        <span style={{ color:'var(--text-code)' }}>{line.code}</span>
                        <span style={{ color: line.valueColor }}>{line.value}</span>
                      </>
                  }
                  {i === visibleLines - 1 && visibleLines < terminalLines.length && (
                    <span style={{ animation:'blink-cursor 0.6s step-end infinite' }}>|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <p style={{ fontFamily:'var(--font-body)',fontSize:'1.05rem',color:'var(--text-secondary)',lineHeight:1.75,marginTop:'1.5rem' }}>
            I'm a 3rd-year CSE student who builds things that learn. My projects span time-series forecasting, AI search algorithms, ML classification models, BI dashboards, and Android apps — driven by the belief that data, when modeled correctly, can answer almost any question.
          </p>

          {/* Tags */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginTop:'1rem' }}>
            {data.hobbies.map(h => (
              <span key={h} style={{
                background:'var(--bg-elevated)', border:'1px solid var(--gold-border)',
                borderRadius:'3px', padding:'4px 12px', fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)',
                transition:'background 150ms, color 150ms, border-color 150ms', cursor:'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--gold-trace)'; e.currentTarget.style.color='var(--text)'; e.currentTarget.style.borderColor='var(--gold-border-hot)' }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--bg-elevated)'; e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--gold-border)' }}
              >{h}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — 2x2 grid */}
        <div style={{ flex:'1 1 300px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {/* Card 1 — Academic */}
          <StatCard title="Academic Performance" delay={0.1}>
            <div ref={cgpaRef} style={{ fontFamily:'var(--font-display)',fontSize:'2.5rem',color:'var(--gold)',fontWeight:700 }}>{cgpaVal.toFixed(2)}</div>
            <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-muted)',marginTop:'4px' }}>Sem 5 SGPA: 9.30 ↑</div>
            <div style={{ display:'flex',alignItems:'flex-end',gap:'4px',marginTop:'0.75rem',height:'36px' }}>
              {semScores.map((s, i) => {
                const h = Math.round(((s - 8.4) / 0.6) * 24 + 12)
                return <div key={i} ref={barsRef} style={{ flex:1, background:'var(--gold)', borderRadius:'2px', height: barsVisible ? `${h}px` : '0', transition:`height 600ms ease-out ${i*80}ms` }} />
              })}
            </div>
          </StatCard>

          {/* Card 2 — Domain */}
          <StatCard title="Domain Coverage" delay={0.15}>
            <div ref={barsRef}>
              {domainBars.map((b, i) => (
                <div key={b.label} style={{ marginBottom:'0.5rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                    <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--text-muted)' }}>{b.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--gold)' }}>{b.pct}%</span>
                  </div>
                  <div style={{ height:'8px', background:'var(--bg-elevated)', borderRadius:'4px', overflow:'hidden' }}>
                    <div style={{ height:'100%', background:'var(--gold)', borderRadius:'4px', width: barsVisible ? `${b.pct}%` : '0', transition:`width 800ms ease-out ${i*100}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </StatCard>

          {/* Card 3 — Languages Pie */}
          <StatCard title="Languages Used" delay={0.2}>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={pieData} innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop:'4px' }}>
              {pieLabels.map((p, i) => (
                <div key={p.l} style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'2px' }}>
                  <div style={{ width:'8px',height:'8px',borderRadius:'50%',background:pieColors[i],flexShrink:0 }} />
                  <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.68rem',color:'var(--text-muted)',flex:1 }}>{p.l}</span>
                  <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.68rem',color:'var(--text-muted)' }}>{p.pct}</span>
                </div>
              ))}
            </div>
          </StatCard>

          {/* Card 4 — Certs */}
          <StatCard title="Certifications" delay={0.25}>
            <div ref={certRef} style={{ fontFamily:'var(--font-display)',fontSize:'2.5rem',color:'var(--gold)',fontWeight:700 }}>{Math.round(certVal)}</div>
            <div style={{ marginTop:'0.75rem' }}>
              {['Palo Alto Networks','IBM','NPTEL / IIT Bombay'].map(n => (
                <div key={n} style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-muted)',lineHeight:1.8 }}>· {n}</div>
              ))}
            </div>
          </StatCard>
        </div>
      </div>
      <style>{`@keyframes blink-cursor { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  )
})

export default About
