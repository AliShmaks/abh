import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData } from '../data/siteData'
import { useRotatingIndex } from '../hooks/useRotatingIndex'

export default function Hero() {
  const { slides, rotationMs } = siteData.hero
  const current = useRotatingIndex(slides.length, rotationMs)
  const slide = slides[current]

  const sectionRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        paddingTop: 24,
        paddingBottom: 40,
        background: 'var(--bg)',
      }}
    >
      {/* Full-width hero */}
      <div
        style={{
          padding: '0 24px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: isDesktop ? 640 : 520,
            borderRadius: 24,
            overflow: 'hidden',
            background: '#0a0a0a',
            isolation: 'isolate',
          }}
        >
          {/* Background images — position shifted down */}
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 23%',
              }}
            />
          </AnimatePresence>

          {/* Dark gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* Slide counter — top right */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              zIndex: 3,
              display: 'flex',
              alignItems: 'baseline',
              gap: 6,
              fontFamily: 'var(--font-display)',
              color: '#fff',
            }}
          >
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              {String(current + 1).padStart(2, '0')}
            </motion.span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              /
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Content — bottom left, at max left edge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                paddingLeft: isDesktop ? 56 : 24,
                paddingRight: isDesktop ? 56 : 24,
                paddingBottom: isDesktop ? 56 : 40,
                paddingTop: isDesktop ? 48 : 32,
                maxWidth: '100%',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ maxWidth: 720 }}
                >
                  <h1
                    style={{
                      fontSize: isDesktop
                        ? 'clamp(44px, 5.5vw, 84px)'
                        : 'clamp(36px, 9vw, 56px)',
                      fontWeight: 700,
                      letterSpacing: '-0.045em',
                      lineHeight: 0.95,
                      fontFamily: 'var(--font-display)',
                      color: '#fff',
                      marginBottom: 16,
                    }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      fontSize: isDesktop ? 17 : 16,
                      lineHeight: 1.55,
                      maxWidth: 440,
                      marginBottom: 28,
                    }}
                  >
                    {slide.subtitle}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Link to={slide.cta.path} className="btn">
                      {slide.cta.label}
                      <span style={{ fontSize: 18 }}>→</span>
                    </Link>

                    <Link
                      to="/about"
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 15,
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(255,255,255,0.3)',
                        paddingBottom: 2,
                        transition: 'color 0.2s ease, border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = 'var(--accent)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                        e.currentTarget.style.borderColor =
                          'rgba(255,255,255,0.3)'
                      }}
                    >
                      Learn more
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress bars — bottom right */}
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              right: isDesktop ? 56 : 24,
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {slides.map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: i === current ? 32 : 12,
                  height: 2,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.25)',
                  overflow: 'hidden',
                  transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {i === current && (
                  <motion.div
                    key={`p-${current}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: rotationMs / 1000,
                      ease: 'linear',
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--accent)',
                      borderRadius: 999,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}