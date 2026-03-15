import React from 'react'
import { motion } from 'framer-motion'
import { data } from '../../data/portfolioData'
import { useInView } from '../../hooks/useInView'

const Skills = React.memo(function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', scrollMarginTop: '80px' }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-label)',fontSize:'0.8rem',color:'var(--gold)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.5rem' }}>
        // TECHNICAL SKILLS
      </motion.div>
      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,3.5vw,2.6rem)',color:'var(--text)',margin:'0 0 0.5rem' }}>
        The Stack.
      </motion.h2>
      <motion.p initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.15 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-body)',fontSize:'1.05rem',color:'var(--text-muted)',margin:'0 0 3rem' }}>
        Every tool chosen. Every skill earned.
      </motion.p>

      <div style={{ display:'flex', gap:'4rem', flexWrap:'wrap' }}>
        {/* LEFT — Feature importance bars */}
        <motion.div ref={ref} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ flex:'1 1 320px' }}>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-muted)',fontStyle:'italic',marginBottom:'1rem' }}>
            // feature_importance_chart.py
          </div>
          {data.skillBars.map((skill, i) => (
            <div key={skill.name} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.65rem' }}>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.8rem',color:'var(--text)',width:'120px',flexShrink:0 }}>{skill.name}</div>
              <div style={{ flex:1, height:'8px', background:'var(--bg-elevated)', borderRadius:'4px', overflow:'hidden' }}>
                <div style={{
                  height:'100%',
                  background:'linear-gradient(90deg, var(--gold), var(--gold-bright))',
                  borderRadius:'4px',
                  width: inView ? `${skill.pct}%` : '0',
                  transition: `width 800ms ease-out ${i * 60}ms`,
                }} />
              </div>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--gold)',width:'36px',textAlign:'right' }}>{skill.pct}%</div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT — Tag grid */}
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }} style={{ flex:'1 1 300px' }}>
          {Object.entries(data.skills).map(([cat, skills]) => (
            <div key={cat} style={{ marginBottom:'1.25rem' }}>
              <div style={{ fontFamily:'var(--font-label)',fontSize:'0.72rem',color:'var(--gold)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.4rem' }}>
                {cat}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                {skills.map(s => (
                  <span key={s} style={{
                    background:'var(--bg-elevated)', border:'1px solid var(--gold-border)',
                    borderRadius:'3px', padding:'3px 10px',
                    fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)',
                    transition:'background 150ms, color 150ms, border-color 150ms', cursor:'default',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.color='#0A0A0A'; e.currentTarget.style.borderColor='var(--gold)' }}
                    onMouseLeave={e => { e.currentTarget.style.background='var(--bg-elevated)'; e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--gold-border)' }}
                  >{s}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

export default Skills
