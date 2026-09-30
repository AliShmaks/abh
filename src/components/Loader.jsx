import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { siteData } from '../data/siteData'

const SESSION_KEY = 'abh_loader_shown'

export default function Loader() {
  const location = useLocation()

  // First visit plays full 2s. Afterwards, short 0.8s on category navigation.
  const [showFull, setShowFull] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem(SESSION_KEY)
  })
  const [showQuick, setShowQuick] = useState(false)

  const timerRef = useRef(null)

  function startQuickLoader() {
    setShowQuick(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setShowQuick(false)
    }, 800)
  }

  // ----- Full (2s) on first visit -----
  useEffect(() => {
    if (!showFull) return
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setShowFull(false)
    }, 2000)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [showFull])

  useEffect(() => {
    if (!showFull) document.body.style.overflow = ''
  }, [showFull])

  // ----- Quick (0.8s) on LINK CLICKS ONLY -----
  useEffect(() => {
    function handleClick(e) {
      if (showFull) return
      if (!sessionStorage.getItem(SESSION_KEY)) return

      // Find the closest anchor/link element
      const link = e.target.closest('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      // Only internal links
      const isInternal =
        href.startsWith('/') &&
        !href.startsWith('//') &&
        link.target !== '_blank'

      if (!isInternal) return

      // Skip if clicking a link to the same path
      if (href === location.pathname) return

      // Skip if it's a filter/dropdown change — those URLs contain more than 2 segments
      // OR if the base path is the same (e.g. /covers → /covers/iphone)
      const currentBase = '/' + location.pathname.split('/')[1]
      const targetBase = '/' + href.split('/')[1]

      if (currentBase === targetBase) return // same section → no loader

      startQuickLoader()
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [showFull, location.pathname])

  const show = showFull || showQuick
  const duration = showFull ? 2000 : 800
  const logoSize = showFull ? 92 : 56

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={showFull ? 'full' : 'quick'}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              width: showFull ? 400 : 260,
              height: showFull ? 400 : 260,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Logo size={logoSize} />
            </motion.div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '0.35em',
              fontSize: 13,
              color: '#ffffff',
            }}
          >
            {siteData.brand.name}
          </motion.span>

          <div
            style={{
              position: 'absolute',
              bottom: 60,
              width: showFull ? 180 : 140,
              height: 2,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.15)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              key={showFull ? 'full-bar' : 'quick-bar'}
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{
                duration: duration / 1000 - 0.2,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--accent)',
                borderRadius: 999,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}