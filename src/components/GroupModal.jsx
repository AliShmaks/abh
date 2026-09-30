import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function GroupModal({ open, onClose, onSave, initial, categories }) {
  const [categoryId, setCategoryId] = useState('')
  const [label, setLabel] = useState('')
  const [slug, setSlug] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [slugTouched, setSlugTouched] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setCategoryId(initial?.category_id || categories[0]?.id || '')
      setLabel(initial?.label || '')
      setSlug(initial?.slug || '')
      setSortOrder(initial?.sort_order ?? 0)
      setSlugTouched(!!initial)
      setError('')
      setBusy(false)
    }
  }, [open, initial, categories])

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(label))
  }, [label, slugTouched])

  async function handleSave() {
    if (!label.trim()) {
      setError('Label is required')
      return
    }
    if (!slug.trim()) {
      setError('Slug is required')
      return
    }
    if (!categoryId) {
      setError('Category is required')
      return
    }

    setBusy(true)
    setError('')

    try {
      await onSave({
        category_id: categoryId,
        label: label.trim(),
        slug: slugify(slug),
        sort_order: Number(sortOrder) || 0,
      })
      onClose()
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 520,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {initial ? 'Edit group' : 'New group'}
              </h2>
              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)',
                  fontSize: 20,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-field">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {categories.length === 0 && (
                    <option value="">No categories yet</option>
                  )}
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Label</label>
                <input
                  className="form-input"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. iPhone 15 Pro"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Slug (URL)</label>
                <input
                  className="form-input"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value)
                    setSlugTouched(true)
                  }}
                  placeholder="iphone-15-pro"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Sort order</label>
                <input
                  type="number"
                  className="form-input"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  placeholder="0"
                />
              </div>

              {error && (
                <div
                  style={{
                    background: 'rgba(255,80,80,0.1)',
                    border: '1px solid rgba(255,80,80,0.3)',
                    color: '#ff8080',
                    fontSize: 13,
                    padding: '12px 14px',
                    borderRadius: 10,
                  }}
                >
                  {error}
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  marginTop: 8,
                  flexDirection: 'row-reverse',
                }}
              >
                <button
                  onClick={handleSave}
                  disabled={busy}
                  className="btn"
                  style={{
                    padding: '14px 24px',
                    fontSize: 15,
                    opacity: busy ? 0.7 : 1,
                    cursor: busy ? 'not-allowed' : 'pointer',
                  }}
                >
                  {busy ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={onClose}
                  className="btn btn-ghost"
                  style={{ padding: '14px 24px', fontSize: 15 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}