import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData } from '../data/siteData'
import { useCart } from '../context/CartContext'
import Logo from './Logo'

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Covers', path: '/covers' },
    { label: 'About', path: '/about' },
  ]

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)

      const diff = y - lastY

      if (y < 80) setHidden(false)
      else if (diff > 4) setHidden(true)
      else if (diff < -4) setHidden(false)

      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? 'var(--text)' : '#ffffff'
  const logoFilter = scrolled ? 'none' : 'brightness(0) invert(1)'

  return (
    <>
      <div style={{ height: 'var(--nav-height)' }} />

      <AnimatePresence>
        {!hidden && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              height: 'var(--nav-height)',
              background: scrolled
                ? 'rgba(255, 255, 255, 0.85)'
                : 'rgba(10, 10, 10, 0.35)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: scrolled
                ? '1px solid var(--border)'
                : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Full-width flex with padding, no max-width */}
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
              }}
            >
              {/* Logo */}
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 60,
                  transition: 'color 0.3s ease',
                }}
              >
                <Logo
                  size={siteData.brand.logoSize}
                  style={{
                    filter: logoFilter,
                    transition: 'filter 0.3s ease',
                  }}
                />
              </Link>

              <div
                className="nav-desktop"
                style={{ display: 'flex', alignItems: 'center', gap: 32 }}
              >
                <nav style={{ display: 'flex', gap: 28 }}>
                  {links.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      style={({ isActive }) => ({
                        fontSize: 14,
                        fontWeight: 600,
                        color: isActive ? 'var(--accent)' : textColor,
                        transition: 'color 0.3s ease',
                      })}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <Link
                  to="/cart"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    color: textColor,
                    transition: 'color 0.3s ease',
                  }}
                  aria-label="Cart"
                >
                  <CartIcon />
                  {count > 0 && <CartBadge count={count} />}
                </Link>
              </div>

              <div
                className="nav-mobile"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: 18,
                  zIndex: 60,
                }}
              >
                <Link
                  to="/cart"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    color: textColor,
                    transition: 'color 0.3s ease',
                  }}
                  aria-label="Cart"
                >
                  <CartIcon />
                  {count > 0 && <CartBadge count={count} />}
                </Link>

                <button
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Menu"
                  style={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <motion.span
                    animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: 'block',
                      width: 22,
                      height: 2,
                      background: textColor,
                      borderRadius: 2,
                      transition: 'background 0.3s ease',
                    }}
                  />
                  <motion.span
                    animate={
                      open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.25 }}
                    style={{
                      display: 'block',
                      width: 22,
                      height: 2,
                      background: textColor,
                      borderRadius: 2,
                      transition: 'background 0.3s ease',
                    }}
                  />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 45,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: 'var(--nav-height) 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {links.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    delay: 0.05 + i * 0.07,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <NavLink
                    to={item.path}
                    style={({ isActive }) => ({
                      display: 'block',
                      fontSize: 40,
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '-0.03em',
                      padding: '12px 0',
                      color: isActive ? 'var(--accent)' : 'var(--text)',
                    })}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: 20,
                color: 'var(--muted)',
                fontSize: 13,
              }}
            >
              {siteData.footer.socials.map((s) => (
                <a key={s.label} href={s.url}>
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function CartBadge({ count }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: -6,
        right: -8,
        background: 'var(--accent)',
        color: '#000',
        fontSize: 10,
        fontWeight: 800,
        borderRadius: 999,
        minWidth: 17,
        height: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 5px',
      }}
    >
      {count}
    </span>
  )
}