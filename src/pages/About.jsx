import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { siteData } from '../data/siteData'

const stats = [
  { value: '10K+', label: 'Orders delivered' },
  { value: '24h', label: 'Support reply' },
  { value: '4.9★', label: 'Customer rating' },
]

const values = [
  {
    title: 'Built to last',
    text: 'Every product is tested for real life. Dropped, tossed, used daily. Before it ever reaches you.',
  },
  {
    title: 'Designed with intent',
    text: 'No clutter. No gimmicks. Just clean essentials that feel good in your hand and look good on your shelf.',
  },
  {
    title: 'Delivered with care',
    text: 'From Beirut to every corner of Lebanon. Cash on delivery, fast turnaround, real people behind every order.',
  },
]

export default function About() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section
        style={{
          position: 'relative',
          paddingTop: 120,
          paddingBottom: 80,
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="section-label"
            style={{ marginBottom: 24 }}
          >
            About ABH
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: 'clamp(40px, 6.5vw, 88px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              maxWidth: 900,
              marginBottom: 32,
            }}
          >
            Everyday essentials,
            <br />
            <span style={{ color: 'var(--muted)' }}>done properly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              color: 'var(--muted)',
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 620,
            }}
          >
            {siteData.about.body}
          </motion.p>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 0,
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                padding: '48px 24px',
                borderRight:
                  i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--accent)',
                  marginBottom: 8,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="section-title"
          >
            What we stand for
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="section-sub"
          >
            Three principles behind everything we make.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 36,
                  height: '100%',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: 'var(--accent)',
                    marginBottom: 20,
                  }}
                >
                  0{i + 1}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 12,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- IMAGE BREAK ---------- */}
      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              height: 520,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${siteData.about.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 40,
                right: 40,
                bottom: 40,
                maxWidth: 560,
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  marginBottom: 12,
                  color: '#fff',
                }}
              >
                Made for real life.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
                Every cover we make. Built for people who don't want to think
                twice about their gear.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
          padding: '120px 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 32,
              maxWidth: 720,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Ready to see what we're about?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/covers" className="btn">
              Shop Covers
              <span style={{ fontSize: 18 }}>→</span>
            </Link>
            <Link to="/about" className="btn btn-ghost">
              Our story
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}