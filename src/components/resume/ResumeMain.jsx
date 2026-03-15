import { data } from '../../data/portfolioData'

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ height: '1px', background: 'var(--gold-border)', margin: '0.4rem 0 0.75rem' }} />
      {children}
    </div>
  )
}

const projectBullets = {
  '01': [
    'Implemented A* and Best-First Search with Manhattan Distance heuristic for optimal pathfinding.',
    'Built interactive Pygame GUI with animated solution playback for 3×3 to 5×5 puzzle boards.',
    'Tracked and displayed performance metrics: nodes explored, time taken, and solution steps.',
  ],
  '02': [
    'Built end-to-end ARIMA pipeline with stationarity testing and walk-forward validation.',
    'Compared classical ARIMA vs. deep learning (TensorFlow/Keras) on identical sales data.',
    'Achieved MAE of 0.031 and RMSE of 0.047, benchmarked across model configurations.',
  ],
  '03': [
    'Designed interactive Tableau and Power BI dashboards for real-time KPI tracking.',
    'Connected to CSV, Excel, and SQL data sources with live filtering and drill-down.',
    'Delivered production-ready business intelligence solutions for data-driven decisions.',
  ],
  '04': [
    'Built multi-model classification pipeline with SVM, Random Forest, and Logistic Regression.',
    'Implemented K-Means clustering for patient segmentation alongside ML risk scoring.',
    'Full preprocessing: missing value imputation, encoding, scaling, and feature selection.',
  ],
  '05': [
    'Developed offline-capable Android app with full CRUD for grades and attendance.',
    'Implemented MVC architecture with SQLite local storage and Material Design UI.',
    'Supports full lifecycle from database layer through polished user interface.',
  ],
}

export default function ResumeMain() {
  return (
    <div>
      <Section title="Summary">
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
          Motivated 3rd-year B.Tech CSE student at CV Raman Global University with a CGPA of 8.92, ranked in the Top 20% of the branch. Proficient in Python, Java, JavaScript, Kotlin, and SQL. Built 5+ real-world projects spanning AI search algorithms, time-series forecasting, BI dashboards, ML classification, and Android development. Focused on becoming a Data Scientist with strong software engineering foundations.
        </p>
      </Section>

      <Section title="Projects">
        {data.projects.map((p, i) => (
          <div key={p.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '4px' }}>
              <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.95rem', color: 'var(--text)', fontWeight: 600 }}>{p.name}</div>
              {p.category && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{p.category}</div>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '0.4rem' }}>
              {p.stack.map(s => (
                <span key={s} style={{ border: '1px solid var(--gold-border)', borderRadius: '3px', padding: '1px 6px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{s}</span>
              ))}
            </div>
            {p.github && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                ↗ {p.github.replace('https://', '')}
              </div>
            )}
            <ul style={{ margin: '0 0 0 1rem', padding: 0 }}>
              {(projectBullets[p.id] || []).map((b, j) => (
                <li key={j} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{b}</li>
              ))}
            </ul>
            {i < data.projects.length - 1 && <div style={{ borderBottom: '1px dotted var(--gold-border)', margin: '1rem 0' }} />}
          </div>
        ))}
      </Section>

      <Section title="Achievements">
        <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
          {[
            'CGPA 8.92 · Top 20% in CSE Branch (certified by CGU Pro Vice-Chancellor, March 2026)',
            'Sem 5 SGPA: 9.30 — Outstanding grades in AI & ML, Web Technology, Cybersecurity Foundations',
            '3 industry certifications in Cybersecurity and Innovation Design (Coursera + NPTEL, 2025)',
            'Developed 5+ end-to-end projects across AI, data science, BI, and Android development',
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.9 }}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Hobbies & Interests">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {data.hobbies.map(h => (
            <span key={h} style={{ border: '1px solid var(--gold-border)', borderRadius: '3px', padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{h}</span>
          ))}
        </div>
      </Section>
    </div>
  )
}
