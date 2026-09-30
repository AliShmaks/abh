import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BrandFilter({
  groups,
  activeGroup, // slug or 'all'
  setActiveGroup, // (slugOrAll) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const currentLabel =
    activeGroup === 'all'
      ? 'All models'
      : groups.find((g) => g.slug === activeGroup)?.label || 'All models'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            color: 'var(--muted)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Model
        </span>

        <div ref={ref} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen((v) => !v)}
            disabled={groups.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontSize: 14,
              fontWeight: 700,
              minWidth: 180,
              justifyContent: 'space-between',
              cursor: groups.length === 0 ? 'not-allowed' : 'pointer',
              opacity: groups.length === 0 ? 0.6 : 1,
            }}
          >
            <span>{currentLabel}</span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ color: 'var(--accent)', fontSize: 11 }}
            >
              ▾
            </motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  minWidth: 220,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: 6,
                  zIndex: 30,
                  boxShadow: '0 20px 60px -20px rgba(0,0,0,0.25)',
                  maxHeight: 320,
                  overflowY: 'auto',
                }}
              >
                <Option
                  label="All models"
                  active={activeGroup === 'all'}
                  onClick={() => {
                    setActiveGroup('all')
                    setOpen(false)
                  }}
                />
                {groups.map((g) => (
                  <Option
                    key={g.id}
                    label={g.label}
                    active={activeGroup === g.slug}
                    onClick={() => {
                      setActiveGroup(g.slug)
                      setOpen(false)
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function Option({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '10px 14px',
        borderRadius: 10,
        background: active ? 'rgba(245,166,35,0.12)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text)',
        fontSize: 14,
        fontWeight: active ? 700 : 500,
        textAlign: 'left',
      }}
      onMouseEnter={(e) => {
        if (!active)
          e.currentTarget.style.background = 'rgba(0,0,0,0.03)'
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = 'transparent'
      }}
    >
      {label}
      {active && <span style={{ fontSize: 12 }}>✓</span>}
    </button>
  )
}