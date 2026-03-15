import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, Database, Settings, Layers, BarChart2, PieChart } from 'lucide-react'
import { data } from '../../data/portfolioData'
import { useInView } from '../../hooks/useInView'

const pipelineNodes = [
  { title: 'RAW DATA',      tools: ['Pandas', 'SQL/CSV'],       Icon: Database },
  { title: 'PREPROCESSING', tools: ['Scikit-learn', 'NumPy'],   Icon: Settings },
  { title: 'FEATURE ENG.',  tools: ['Statsmodels', 'Pandas'],   Icon: Layers },
  { title: 'MODEL TRAINING',tools: ['TensorFlow', 'Sklearn'],   Icon: BarChart2 },
  { title: 'EVALUATION',    tools: ['MAE/RMSE', 'Cross-Val'],   Icon: BarChart2 },
  { title: 'VISUALIZATION', tools: ['Matplotlib', 'Power BI'],  Icon: PieChart },
]

const DataScience = React.memo(function DataScience() {
  const [matrixRef, matrixInView] = useInView()
  const [pipeRef, pipeInView] = useInView()

  return (
    <section id="data-science" style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', scrollMarginTop: '80px' }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-label)',fontSize:'0.8rem',color:'var(--gold)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.5rem' }}>
        // DATA SCIENCE
      </motion.div>
      <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,3.5vw,2.6rem)',color:'var(--text)',margin:'0 0 0.5rem' }}>
        Models. Pipelines. Insights.
      </motion.h2>
      <motion.p initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:0.15 }} viewport={{ once:true }} style={{ fontFamily:'var(--font-body)',fontSize:'1.05rem',color:'var(--text-muted)',margin:'0 0 3rem' }}>
        A breakdown of the data science work across all projects.
      </motion.p>

      {/* Matrix */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-muted)',fontStyle:'italic',marginBottom:'1rem' }}>
          // technique_coverage_matrix.py
        </div>
        <div ref={matrixRef} style={{ background:'var(--bg-card)', border:'1px solid var(--gold-border)', borderRadius:'8px', overflow:'auto' }}>
          <table style={{ borderCollapse:'collapse', width:'100%', minWidth:'500px' }}>
            <thead>
              <tr>
                <th style={{ width:'160px' }} />
                {data.techniqueMatrix.projects.map(p => (
                  <th key={p} style={{ fontFamily:'var(--font-label)', fontSize:'0.78rem', color:'var(--gold)', textTransform:'uppercase', padding:'0.75rem 1rem', textAlign:'center', fontWeight:600 }}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.techniqueMatrix.techniques.map((tech, ri) => (
                <tr key={tech} style={{ background: ri % 2 === 0 ? 'transparent' : 'var(--bg-elevated)' }}>
                  <td style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--text-muted)', padding:'0.5rem 1rem', textAlign:'right' }}>{tech}</td>
                  {data.techniqueMatrix.coverage[ri].map((filled, ci) => (
                    <td key={ci} style={{ textAlign:'center', padding:'0.5rem 1rem' }}>
                      {filled ? (
                        <motion.div
                          initial={{ scale: 0 }} animate={matrixInView ? { scale: 1 } : {}}
                          transition={{ delay: (ri * 4 + ci) * 0.04, duration: 0.3 }}
                          style={{ width:'12px', height:'12px', borderRadius:'50%', background:'var(--gold)', boxShadow:'0 0 8px var(--gold-glow)', margin:'auto' }}
                        />
                      ) : (
                        <div style={{ width:'12px', height:'12px', borderRadius:'50%', border:'1px solid var(--gold-dim)', margin:'auto' }} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Metrics cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1.5rem', marginBottom:'3rem' }}>
        {data.modelMetrics.map((m, i) => (
          <motion.div key={m.project} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:i*0.1 }} viewport={{ once:true }}
            style={{ background:'var(--bg-terminal)', border:'1px solid var(--gold-border)', borderTop:'3px solid var(--gold)', borderRadius:'8px', padding:'1.5rem', transition:'box-shadow 200ms, transform 200ms' }}
            whileHover={{ y: -2, boxShadow: '0 0 30px rgba(201,168,76,0.12)' }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.5rem' }}>
              <Terminal size={14} style={{ color:'var(--gold)' }} />
              <span style={{ fontFamily:'var(--font-label)', fontSize:'0.8rem', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{m.project}</span>
            </div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.85rem', color:'var(--text)', marginBottom:'0.75rem' }}>{m.model}</div>
            <div>
              {m.metrics.map((met, j) => (
                <div key={met.label}>
                  {j > 0 && <div style={{ height:'1px', background:'var(--gold-border)', margin:'0.4rem 0' }} />}
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)' }}>{met.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--gold)', fontWeight:500 }}>{met.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pipeline */}
      <div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', fontStyle:'italic', marginBottom:'1rem' }}>
          // ml_pipeline.py — Parth's standard workflow
        </div>
        <div ref={pipeRef} style={{ display:'flex', alignItems:'center', overflowX:'auto', gap:'0', paddingBottom:'0.5rem' }}>
          {pipelineNodes.map((node, i) => (
            <React.Fragment key={node.title}>
              <motion.div
                initial={{ opacity:0, y:20 }} animate={pipeInView ? { opacity:1, y:0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{
                  background:'var(--bg-elevated)', border:'1px solid var(--gold-border)', borderRadius:'6px',
                  padding:'1rem 1.25rem', minWidth:'130px', flexShrink:0,
                  transition:'border-color 150ms', cursor:'default',
                }}
                whileHover={{ borderColor: 'rgba(201,168,76,0.6)' }}
              >
                <node.Icon size={18} style={{ color:'var(--gold)', marginBottom:'6px' }} />
                <div style={{ fontFamily:'var(--font-label)', fontSize:'0.75rem', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'4px' }}>{node.title}</div>
                {node.tools.map(t => (
                  <div key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--text-muted)', lineHeight:1.6 }}>{t}</div>
                ))}
              </motion.div>
              {i < pipelineNodes.length - 1 && (
                <div style={{ display:'flex', alignItems:'center', flexShrink:0, padding:'0 4px' }}>
                  <div style={{ width:'20px', height:'1px', background:'var(--gold-dim)' }} />
                  <div style={{ width:0, height:0, borderTop:'4px solid transparent', borderBottom:'4px solid transparent', borderLeft:'6px solid var(--gold-dim)' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
})

export default DataScience
