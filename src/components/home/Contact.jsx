import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Link2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { data } from '../../data/portfolioData'
import { useInView } from '../../hooks/useInView'

const socialCards = [
  { Icon: Github,   label: 'GitHub',    sub: 'github.com/ParthSamarth', sub2: '5+ repositories', href: 'https://github.com/ParthSamarth', external: true },
  { Icon: Linkedin, label: 'LinkedIn',  sub: 'parth-samarth-43b774306', sub2: 'Connect professionally', href: 'https://linkedin.com/in/parth-samarth-43b774306', external: true },
  { Icon: Mail,     label: 'Email Me',  sub: 'parthsamarth33@gmail.com', sub2: 'Response within 24–48h', href: 'mailto:parthsamarth33@gmail.com', external: false },
  { Icon: Link2,    label: 'All Links', sub: 'parthsamarth.dev/links',   sub2: 'Social hub page', href: '/links', internal: true },
]

const Contact = React.memo(function Contact() {
  const navigate = useNavigate()
  const [ref, inView] = useInView()
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(data.personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', scrollMarginTop: '80px' }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-label)',fontSize:'0.8rem',color:'var(--gold)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.5rem' }}>
        // CONTACT
      </motion.div>
      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,3.5vw,2.6rem)',color:'var(--text)',margin:'0 0 0.5rem' }}>
        Let&apos;s Build Something.
      </motion.h2>
      <motion.p initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.15 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-body)',fontSize:'1.05rem',color:'var(--text-secondary)',margin:'0 0 2.5rem' }}>
        Open to internships, research collaborations, and interesting projects.
      </motion.p>

      {/* Social cards */}
      <div style={{ display:'flex', gap:'1rem', marginBottom:'3rem', flexWrap:'wrap' }}>
        {socialCards.map(({ Icon, label, sub, sub2, href, external, internal }, i) => (
          <motion.div key={label} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:i*0.08 }} viewport={{ once:true }}
            onClick={() => internal ? navigate(href) : external ? window.open(href,'_blank','noopener') : window.location.href = href}
            style={{
              flex:'1 1 160px', background:'var(--bg-card)', borderTop:'3px solid var(--gold)',
              border:'1px solid var(--gold-border)', borderTopWidth:'3px', borderRadius:'0 0 8px 8px',
              padding:'1.25rem', textAlign:'center', cursor:'pointer',
              transition:'border-top-color 200ms, box-shadow 200ms, transform 200ms',
            }}
            whileHover={{ y: -3, boxShadow:'0 0 30px rgba(201,168,76,0.12)' }}
          >
            <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'var(--bg-elevated)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0.75rem' }}>
              <Icon size={20} style={{ color:'var(--gold)' }} />
            </div>
            <div style={{ fontFamily:'var(--font-label)', fontSize:'1rem', color:'var(--text)', fontWeight:600, marginBottom:'4px' }}>{label}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', marginBottom:'2px' }}>{sub}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--text-muted)' }}>{sub2}</div>
          </motion.div>
        ))}
      </div>

      {/* Terminal + Form */}
      <div ref={ref} style={{ display:'flex', gap:'2rem', flexWrap:'wrap' }}>
        {/* Terminal */}
        <motion.div initial={{ opacity:0,x:-20 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ duration:0.5 }} style={{ flex:'1 1 300px' }}>
          <div style={{ background:'var(--bg-terminal)', border:'1px solid var(--gold-border)', borderRadius:'8px', overflow:'hidden' }}>
            <div style={{ background:'#1a1a1a', padding:'10px 16px', display:'flex', gap:'8px', alignItems:'center' }}>
              {['#FF5F57','#FFBD2E','#28CA41'].map(c => <div key={c} style={{ width:'6px',height:'6px',borderRadius:'50%',background:c }} />)}
              <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-muted)',marginLeft:'8px' }}>parth@portfolio:~$ contact</span>
            </div>
            <div style={{ padding:'1.25rem', fontFamily:'var(--font-mono)', fontSize:'0.82rem', lineHeight:2 }}>
              {/* Email row */}
              <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                <span style={{ color:'var(--gold)' }}>$ contact --email</span>
                <span style={{ color:'var(--text)' }}>{data.personal.email}</span>
                <button onClick={handleCopy} style={{
                  background:'var(--bg-elevated)', border:'1px solid var(--gold-border)', borderRadius:'3px',
                  padding:'1px 8px', fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                  color: copied ? 'var(--gold)' : 'var(--text-muted)',
                  cursor:'pointer', transition:'color 150ms',
                }}>
                  {copied ? '✓ copied' : 'copy'}
                </button>
              </div>
              {/* LinkedIn */}
              <div>
                <span style={{ color:'var(--gold)' }}>$ contact --linkedin</span>{' '}
                <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ color:'var(--text)', textDecoration:'underline', cursor:'pointer' }}>
                  /in/parth-samarth-43b774306 ↗
                </a>
              </div>
              {/* GitHub */}
              <div>
                <span style={{ color:'var(--gold)' }}>$ contact --github</span>{' '}
                <a href={data.personal.github} target="_blank" rel="noopener noreferrer"
                  style={{ color:'var(--text)', textDecoration:'underline', cursor:'pointer' }}>
                  /ParthSamarth ↗
                </a>
              </div>
              {/* Location */}
              <div>
                <span style={{ color:'var(--gold)' }}>$ contact --location</span>{' '}
                <span style={{ color:'var(--text)' }}>Jharkhand, India (IST UTC+5:30)</span>
              </div>
              {/* Cursor */}
              <div style={{ color:'var(--text-code)' }}>
                $ <span style={{ animation:'blink-cursor 0.6s step-end infinite' }}>_</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity:0,x:20 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ duration:0.5 }} style={{ flex:'1 1 300px' }}>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {[
              { key:'name',    label:'NAME',    type:'text',  placeholder:'Parth Samarth' },
              { key:'email',   label:'EMAIL',   type:'email', placeholder:'you@example.com' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.3rem' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]}
                  onChange={e => setForm(prev => ({...prev,[f.key]:e.target.value}))}
                  placeholder={f.placeholder}
                  style={{
                    width:'100%', background:'var(--bg-elevated)', border:'1px solid var(--gold-border)',
                    borderRadius:'4px', padding:'10px 14px', fontFamily:'var(--font-mono)', fontSize:'0.85rem',
                    color:'var(--text)', outline:'none', boxSizing:'border-box', transition:'border-color 200ms, box-shadow 200ms',
                  }}
                  onFocus={e => { e.target.style.borderColor='var(--gold)'; e.target.style.boxShadow='0 0 0 3px var(--gold-trace)' }}
                  onBlur={e => { e.target.style.borderColor='var(--gold-border)'; e.target.style.boxShadow='none' }}
                />
              </div>
            ))}
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.3rem' }}>MESSAGE</label>
              <textarea rows={5} value={form.message}
                onChange={e => setForm(prev => ({...prev,message:e.target.value}))}
                placeholder="Tell me about your project..."
                style={{
                  width:'100%', background:'var(--bg-elevated)', border:'1px solid var(--gold-border)',
                  borderRadius:'4px', padding:'10px 14px', fontFamily:'var(--font-mono)', fontSize:'0.85rem',
                  color:'var(--text)', outline:'none', resize:'vertical', boxSizing:'border-box', transition:'border-color 200ms, box-shadow 200ms',
                }}
                onFocus={e => { e.target.style.borderColor='var(--gold)'; e.target.style.boxShadow='0 0 0 3px var(--gold-trace)' }}
                onBlur={e => { e.target.style.borderColor='var(--gold-border)'; e.target.style.boxShadow='none' }}
              />
            </div>
            <button type="submit" style={{
              width:'100%', background:'var(--gold)', color:'#0A0A0A',
              fontFamily:'var(--font-label)', fontWeight:600, fontSize:'0.95rem', letterSpacing:'0.08em',
              padding:'12px', borderRadius:'4px', border:'none', cursor:'pointer',
              transition:'background 200ms, box-shadow 200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--gold-bright)'; e.currentTarget.style.boxShadow='var(--shadow-gold)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.boxShadow='none' }}
            >SEND MESSAGE →</button>
            {submitted && (
              <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem', color:'var(--text-code)' }}>
                $ message --send ............... <span style={{ color:'var(--gold)' }}>✓ Delivered</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      <div style={{ textAlign:'center', marginTop:'2rem', fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)' }}>
        // response_time ≈ 24–48 hours · Currently in IST (UTC+5:30)
      </div>

      <style>{`@keyframes blink-cursor { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  )
})

export default Contact
