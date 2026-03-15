import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import ResumeSidebar from '../components/resume/ResumeSidebar'
import ResumeMain from '../components/resume/ResumeMain'

export default function Resume() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '80px 0 3rem', background: 'var(--bg)' }}>
        {/* Header */}
        <div className="no-print" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
          padding: 'clamp(1.5rem,4vw,3rem) clamp(1.5rem,5vw,4rem) 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--gold)', transition: 'color 150ms' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gold)'}
            >← PORTFOLIO</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}> / </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--gold)' }}>RESUME</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={`${import.meta.env.BASE_URL}Parth_Samarth_cv.pdf`}
              download="Parth_Samarth_CV.pdf"
              style={{
                display: 'inline-block', background: 'var(--gold)', color: '#0A0A0A',
                fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.85rem',
                padding: '8px 18px', borderRadius: '4px', textDecoration: 'none',
                transition: 'background 200ms',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-bright)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >DOWNLOAD PDF</a>
            <button onClick={() => window.print()} style={{
              background: 'transparent', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              border: '1px solid var(--gold-border)', padding: '7px 16px', borderRadius: '4px', cursor: 'pointer',
              transition: 'border-color 150ms',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-border-hot)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
            >PRINT</button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>Last updated: Mar 2026</span>
          </div>
        </div>

        {/* Resume card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="resume-card"
          style={{
            maxWidth: '1000px', margin: '2rem auto', padding: 'clamp(1.5rem,4vw,3rem)',
            background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: '8px',
            boxShadow: 'var(--shadow-card)', boxSizing: 'border-box',
          }}
        >
          {/* Card header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--gold)' }}>PARTH SAMARTH</div>
            <div style={{ fontFamily: 'var(--font-label)', fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Software Developer · Aspiring Data Scientist</div>
            <div style={{ height: '1px', background: 'var(--gold-border)', margin: '1rem 0' }} />
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
            {/* Sidebar */}
            <div style={{ flex: '0 0 28%', minWidth: '200px' }}>
              <ResumeSidebar />
            </div>
            {/* Divider */}
            <div style={{ width: '1px', background: 'var(--gold-border)', alignSelf: 'stretch', flexShrink: 0 }} />
            {/* Main */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <ResumeMain />
            </div>
          </div>
        </motion.div>

        {/* Page footer */}
        <div style={{ textAlign: 'center', padding: '0 1rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <div>This resume is kept current. Last verified: March 2026.</div>
          <div>View the full interactive portfolio at github.com/ParthSamarth</div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; color: #000 !important; }
          .no-print { display: none !important; }
          .resume-card { border: none !important; box-shadow: none !important; }
          * { color: #000 !important; background: transparent !important; border-color: #999 !important; }
          a { color: #000 !important; text-decoration: underline; }
        }
      `}</style>
    </PageTransition>
  )
}
