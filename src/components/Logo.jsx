import { siteData } from '../data/siteData'

export default function Logo({ size }) {
  const { name, logoImage, logoVariant, logoSize } = siteData.brand
  const finalSize = size ?? logoSize ?? 40

  // ----- Image variant -----
  if (logoVariant === 'image' && logoImage) {
    return (
      <img
        src={logoImage}
        alt={name}
        style={{
          width: finalSize,
          height: finalSize,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    )
  }

  // ----- Plain text variant -----
  if (logoVariant === 'text') {
    return (
      <span
        style={{
          fontWeight: 800,
          fontSize: finalSize * 0.5,
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-display)',
          color: 'var(--text)',
          lineHeight: 1,
        }}
      >
        {name}
      </span>
    )
  }

  // ----- Circle variant (default fallback) -----
  return (
    <div
      style={{
        width: finalSize,
        height: finalSize,
        borderRadius: '50%',
        background: '#fff',
        border: '2px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: finalSize * 0.32,
        letterSpacing: '0.5px',
        color: '#000',
        fontFamily: 'Inter, system-ui, sans-serif',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {name}
    </div>
  )
}