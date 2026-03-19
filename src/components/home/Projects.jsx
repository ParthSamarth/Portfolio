import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Terminal } from 'lucide-react'
import { data } from '../../data/portfolioData'
import { useInView } from '../../hooks/useInView'

// Syntax highlighting for code snippet
function SyntaxLine({ line }) {
  const keywords = ['def', 'while', 'if', 'for', 'return', 'not']
  const builtins = ['PriorityQueue', 'get', 'put', 'get_neighbors', 'is_goal', 'reconstruct_path', 'manhattan_distance']

  const parts = []
  let remaining = line
  let key = 0

  // Simple tokenizer
  const tokens = remaining.split(/(\s+|[():#.,=]|"[^"]*"|\b\w+\b)/).filter(Boolean)
  return (
    <div style={{ marginBottom: 0 }}>
      {tokens.map((token, i) => {
        let color = 'var(--text-code)'
        if (keywords.includes(token.trim())) color = 'var(--gold)'
        else if (builtins.includes(token.trim())) color = 'var(--accent-blue)'
        else if (token.trim().startsWith('#')) color = 'var(--text-muted)'
        else if (/^\d+$/.test(token.trim())) color = '#b5cea8'
        else if (token.startsWith('"') || token.startsWith("'")) color = '#ce9178'
        return <span key={i} style={{ color, fontStyle: token.trim().startsWith('#') ? 'italic' : 'normal' }}>{token}</span>
      })}
    </div>
  )
}

function FeaturedProject({ project }) {
  const [ref, inView] = useInView()
  const [codeText, setCodeText] = useState('')
  const intervalRef = useRef(null)
  const snippet = project.codeSnippet || ''

  useEffect(() => {
    if (inView && codeText.length < snippet.length) {
      intervalRef.current = setInterval(() => {
        setCodeText(t => {
          if (t.length >= snippet.length) { clearInterval(intervalRef.current); return t }
          return snippet.slice(0, t.length + 1)
        })
      }, 12)
    }
    return () => clearInterval(intervalRef.current)
  }, [inView, snippet])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="glass-panel"
      style={{
        border: '1px solid var(--gold-border)', borderRadius: '8px', padding: '2.5rem',
        background: 'var(--bg-elevated)',
        display: 'flex', gap: '2rem', flexWrap: 'wrap',
        transition: 'border-color 200ms, box-shadow 200ms', cursor: 'default',
      }}
      whileHover={{ borderColor: 'rgba(201,168,76,0.6)', boxShadow: '0 0 30px rgba(201,168,76,0.12)' }}
    >
      {/* LEFT */}
      <div style={{ flex: '1 1 320px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '-0.5rem', left: '-0.5rem',
          fontFamily: 'var(--font-display)', fontSize: '7rem', color: 'var(--gold-trace)',
          lineHeight: 1, pointerEvents: 'none', zIndex: 0,
        }}>01</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {project.category && (
            <div style={{
              display: 'inline-block', border: '1px solid var(--gold)', color: 'var(--gold)',
              fontFamily: 'var(--font-label)', fontSize: '0.7rem', padding: '2px 10px',
              borderRadius: '12px', marginBottom: '0.75rem',
            }}>{project.category}</div>
          )}
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text)', margin: '0 0 0.25rem' }}>{project.name}</h3>
          <p style={{ fontFamily: 'var(--font-label)', fontSize: '1rem', color: 'var(--gold)', margin: '0 0 1rem' }}>{project.subtitle}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 1rem' }}>{project.description}</p>

          <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '0.75rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{project.impact}</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {project.stack.map(s => (
              <span key={s} style={{ background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: '3px', padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s}</span>
            ))}
          </div>

          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-label)', fontSize: '0.85rem', color: 'var(--gold)', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-bright)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gold)'}
            >
              <ExternalLink size={14} /> [ VIEW REPO →]
            </a>
          )}
        </div>
      </div>

      {/* RIGHT — code */}
      <div ref={ref} style={{ flex: '1 1 280px', background: 'var(--bg-terminal)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1rem', borderBottom: '1px solid var(--gold-border)' }}>
          <Terminal size={14} style={{ color: 'var(--gold)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>puzzle.py</span>
        </div>
        <div style={{ padding: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.7, whiteSpace: 'pre', overflowX: 'auto' }}>
          {codeText.split('\n').map((line, i) => <SyntaxLine key={i} line={line} />)}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: '8px',
        padding: '1.5rem', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 250ms, border-color 250ms, box-shadow 250ms', cursor: 'default',
      }}
      whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.6)', boxShadow: '0 0 30px rgba(201,168,76,0.12)' }}
    >
      {/* Category badge — absolute top-right */}
      {project.category && (
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          border: '1px solid var(--gold)', color: 'var(--gold)',
          fontFamily: 'var(--font-label)', fontSize: '0.7rem',
          padding: '2px 10px', borderRadius: '12px',
        }}>
          {project.category}
        </div>
      )}

      {/* Stack tags — TOP */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
        {project.stack.map(s => (
          <span key={s} style={{
            background: 'var(--gold-trace)', border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-xs)', padding: '3px 9px',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: 'var(--gold-mid)', textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>{s}</span>
        ))}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text)', margin: '0 0 0.25rem' }}>{project.name}</h3>

      {/* Subtitle */}
      <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.9rem', color: 'var(--gold)', margin: '0 0 0.75rem' }}>{project.subtitle}</p>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{project.description}</p>

      {/* Highlight line */}
      {project.highlight && (
        <div style={{ marginTop: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-code)', fontStyle: 'italic' }}>
          <span style={{ color: 'var(--gold-mid)' }}>→ </span>{project.highlight}
        </div>
      )}

      {/* GitHub link — pushed to bottom */}
      <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
              color: 'var(--gold-mid)', textDecoration: 'none',
              background: 'none', border: 'none', padding: 0,
              transition: 'color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-bright)'; e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold-mid)'; e.currentTarget.style.textDecoration = 'none' }}
          >
            <ExternalLink size={14} /> VIEW ON GITHUB →
          </a>
        ) : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>[ PRIVATE REPO ]</span>
        )}
      </div>
    </motion.div>
  )
}

const Projects = React.memo(function Projects() {
  return (
    <section id="work" style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', scrollMarginTop: '80px' }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-label)',fontSize:'0.8rem',color:'var(--gold)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.5rem' }}>
        // WORK
      </motion.div>
      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,3.5vw,2.6rem)',color:'var(--text)',margin:'0 0 0.5rem' }}>
        Projects.
      </motion.h2>
      <motion.p initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.15 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-body)',fontSize:'1.05rem',color:'var(--text-muted)',margin:'0 0 2rem' }}>
        End-to-end builds across AI, data science, and software engineering.
      </motion.p>

      <FeaturedProject project={data.projects[0]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        {data.projects.slice(1).map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
})

export default Projects
