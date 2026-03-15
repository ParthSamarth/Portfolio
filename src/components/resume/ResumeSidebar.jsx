import { data } from '../../data/portfolioData'
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ height: '1px', background: 'var(--gold-border)', margin: '0.4rem 0 0.75rem' }} />
      {children}
    </div>
  )
}

export default function ResumeSidebar() {
  return (
    <div>
      <Section title="Contact">
        {[
          { Icon: Mail,    text: data.personal.email,    href: `mailto:${data.personal.email}` },
          { Icon: Phone,   text: data.personal.phone },
          { Icon: MapPin,  text: data.personal.location },
          { Icon: Linkedin,text: 'linkedin.com/in/parth-samarth', href: data.personal.linkedin, newTab: true },
          { Icon: Github,  text: 'github.com/ParthSamarth', href: data.personal.github, newTab: true },
        ].map(({ Icon, text, href, newTab }) => (
          <div key={text} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <Icon size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
            {href ? (
              <a href={href} target={newTab ? '_blank' : undefined} rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', textDecoration: 'none', wordBreak: 'break-all', transition: 'color 150ms' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >{text}</a>
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{text}</span>
            )}
          </div>
        ))}
      </Section>

      <Section title="Education">
        {data.education.map(edu => (
          <div key={edu.institution} style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text)', fontWeight: 600 }}>{edu.institution}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {edu.degree} · {edu.period} · {edu.score}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Technical Skills">
        {Object.entries(data.skills).map(([cat, skills]) => (
          <div key={cat} style={{ marginBottom: '0.65rem' }}>
            <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '3px' }}>{cat}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
              {skills.map(s => (
                <span key={s} style={{
                  border: '1px solid var(--gold-border)', borderRadius: '3px', padding: '2px 7px',
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
                }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Certifications">
        {data.certifications.map(c => (
          <div key={c.name} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            · {c.name} · {c.issuer} · {c.date}
          </div>
        ))}
      </Section>

      <Section title="Languages">
        {['English — Professional Working', 'Hindi — Native'].map(l => (
          <div key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{l}</div>
        ))}
      </Section>
    </div>
  )
}
