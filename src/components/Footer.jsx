import { siteData } from '../data/siteData'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 0',
        marginTop: 96,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={32} />
          <span style={{ color: 'var(--muted)', fontSize: 14 }}>
            {siteData.footer.copyright}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {siteData.footer.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              style={{ fontSize: 14, color: 'var(--muted)' }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}