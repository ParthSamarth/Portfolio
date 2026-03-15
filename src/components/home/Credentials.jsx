import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lightbulb } from 'lucide-react'
import { data } from '../../data/portfolioData'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

const gradeStyle = (g) => {
  if (g === 'O') return { background: 'rgba(212,175,55,0.2)', color: 'var(--gold)' }
  if (g === 'E') return { background: 'rgba(74,222,128,0.1)', color: '#4ade80' }
  if (g === 'A') return { background: 'rgba(96,165,250,0.1)', color: '#60a5fa' }
  return { background: 'var(--bg-elevated)', color: 'var(--gold)', fontFamily: 'var(--font-display)' }
}

const certIcon = (field) => field === 'Cybersecurity' ? Shield : Lightbulb
const platformBadge = (p) => p === 'Coursera' ? 'COURSERA' : 'NPTEL'

const Credentials = React.memo(function Credentials() {
  const [spineRef, spineInView] = useInView()
  const [cgpaRef, cgpaVal] = useCountUp(8.92, 1500, 2)

  return (
    <section id="credentials" style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', background: 'var(--bg-card)', scrollMarginTop: '80px' }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-label)',fontSize:'0.8rem',color:'var(--gold)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.5rem' }}>
        // CREDENTIALS
      </motion.div>
      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,3.5vw,2.6rem)',color:'var(--text)',margin:'0 0 3rem' }}>
        Education &amp; Certifications.
      </motion.h2>

      <div style={{ display:'flex', gap:'4rem', flexWrap:'wrap', alignItems:'flex-start' }}>
        {/* LEFT — Timeline */}
        <div style={{ flex:'1 1 340px', position:'relative' }}>
          <div ref={spineRef} style={{
            position:'absolute', left:'11px', top:0, bottom:0, width:'2px',
            background:'linear-gradient(to bottom, var(--gold), var(--gold-dim), transparent)',
            height: spineInView ? '100%' : '0',
            transition: 'height 1s ease-out',
          }} />

          {data.education.map((edu, i) => (
            <div key={edu.institution} style={{ paddingLeft:'40px', position:'relative', marginBottom:'2.5rem' }}>
              {/* Dot */}
              <div style={{
                position:'absolute', left: edu.current ? '5px' : '7px', top:'6px',
                width: edu.current ? '12px' : '8px', height: edu.current ? '12px' : '8px',
                borderRadius:'50%',
                background: edu.current ? 'var(--gold)' : 'var(--bg-elevated)',
                border: edu.current ? 'none' : '2px solid var(--gold-dim)',
                boxShadow: edu.current ? '0 0 12px var(--gold-glow)' : 'none',
              }}>
                {edu.current && (
                  <div style={{
                    position:'absolute', inset:'-4px', borderRadius:'50%',
                    border:'2px solid var(--gold)', opacity:0.4,
                    animation:'pulse-ring 2s infinite',
                  }} />
                )}
              </div>

              {edu.current ? (
                <motion.div initial={{ opacity:0,x:20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }}
                  style={{ background:'var(--bg-elevated)', border:'1px solid var(--gold-border)', borderRadius:'8px', padding:'1.25rem' }}
                >
                  <div style={{ display:'inline-block', background:'rgba(26,18,0,0.8)', border:'1px solid var(--gold)', borderRadius:'3px', padding:'2px 8px', fontFamily:'var(--font-label)', fontSize:'0.68rem', color:'var(--gold)', marginBottom:'0.75rem' }}>
                    CURRENT · 2023–PRESENT
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:'var(--text)', marginBottom:'0.25rem' }}>{edu.institution}</div>
                  <div style={{ fontFamily:'var(--font-label)', fontSize:'0.9rem', color:'var(--text-secondary)', marginBottom:'0.75rem' }}>{edu.degree}</div>
                  <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap', marginBottom:'0.75rem' }}>
                    {['CGPA: 8.92','SGPA: 9.30','Top 20%'].map(s => (
                      <React.Fragment key={s}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--gold)' }}>{s}</span>
                        {s !== 'Top 20%' && <span style={{ width:'1px', height:'14px', background:'var(--gold-dim)' }} />}
                      </React.Fragment>
                    ))}
                  </div>
                  {edu.subjects && (
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px' }}>
                      {edu.subjects.map(sub => (
                        <div key={sub.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'8px' }}>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-muted)' }}>{sub.name}</span>
                          <span style={{ fontFamily:'var(--font-label)', fontSize:'0.65rem', padding:'1px 6px', borderRadius:'3px', ...gradeStyle(sub.grade) }}>
                            {sub.grade}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity:0,x:20 }} whileInView={{ opacity:1,x:0 }} transition={{ delay:i*0.1 }} viewport={{ once:true }}>
                  <div style={{ fontFamily:'var(--font-label)', fontSize:'0.95rem', color:'var(--text)', fontWeight:600 }}>{edu.institution}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)', lineHeight:1.7 }}>
                    {edu.degree} · {edu.period} · {edu.score}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT — Certs */}
        <div style={{ flex:'1 1 300px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {data.certifications.map((cert, i) => {
              const Icon = certIcon(cert.field)
              return (
                <motion.div key={cert.name}
                  initial={{ opacity:0,x:20 }} whileInView={{ opacity:1,x:0 }} transition={{ delay:i*0.1 }} viewport={{ once:true }}
                  style={{
                    display:'flex', alignItems:'center', gap:'0',
                    background:'var(--bg-card)', borderLeft:'4px solid var(--gold)',
                    borderRadius:'0 8px 8px 0', padding:'1rem 1.25rem',
                    border:'1px solid var(--gold-border)', borderLeftWidth:'4px',
                    overflow:'hidden', position:'relative',
                    transition:'box-shadow 200ms',
                  }}
                  whileHover={{ boxShadow:'0 0 30px rgba(201,168,76,0.12)' }}
                >
                  <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'var(--bg-elevated)', border:'1px solid var(--gold-border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={22} style={{ color:'var(--gold)' }} />
                  </div>
                  <div style={{ flex:1, paddingLeft:'1rem' }}>
                    <div style={{ fontFamily:'var(--font-label)', fontSize:'0.95rem', color:'var(--text)', fontWeight:600 }}>{cert.name}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)' }}>Issued by {cert.issuer}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-muted)' }}>{cert.date}</div>
                  </div>
                  <div style={{ border:'1px solid var(--gold-border)', borderRadius:'12px', padding:'2px 8px', fontFamily:'var(--font-label)', fontSize:'0.68rem', color:'var(--text-muted)', flexShrink:0 }}>
                    {platformBadge(cert.platform)}
                  </div>
                </motion.div>
              )
            })}
          </div>
          <div style={{ marginTop:'1.5rem', fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', fontStyle:'italic' }}>
            // Next targets: AWS Cloud Practitioner · Google Data Analytics
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </section>
  )
})

export default Credentials
