import { siteData } from '../data/siteData'

export default function Features() {
  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '48px 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
        }}
      >
        {siteData.features.map((f) => (
          <div key={f.title} style={{ display: 'flex', gap: 14 }}>
            <span style={{ fontSize: 26 }}>{f.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{f.title}</div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>{f.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}