import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ClosingCTA() {
  return (
    <section
      className="section"
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 20,
                height: 1,
                background: 'var(--accent)',
                display: 'inline-block',
              }}
            />
            Ready when you are
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
              marginBottom: 24,
            }}
          >
            Ready to upgrade
            <br />
            <span style={{ color: 'var(--muted)' }}>your everyday?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              color: 'var(--muted)',
              fontSize: 17,
              lineHeight: 1.65,
              maxWidth: 520,
              margin: '0 auto 40px',
            }}
          >
            Premium covers. Built to last.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link to="/covers" className="btn">
              Shop Covers
              <span style={{ fontSize: 18 }}>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}