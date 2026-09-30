import { Link } from 'react-router-dom'
import { siteData } from '../data/siteData'

export default function PromoBanner() {
  const { title, subtitle, cta } = siteData.promo

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            background:
              'linear-gradient(135deg, var(--accent) 0%, #ff8a00 100%)',
            color: '#000',
            borderRadius: 'var(--radius)',
            padding: '56px 40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              {title}
            </h3>
            <p style={{ fontSize: 16, opacity: 0.85 }}>{subtitle}</p>
          </div>
          <Link
            to={cta.path}
            style={{
              background: '#000',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 'var(--radius)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}