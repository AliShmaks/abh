import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageUploader from './ImageUploader'

export default function ProductModal({
  open,
  onClose,
  onSave,
  initial,
  categories,
  groups,
}) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [groupId, setGroupId] = useState('')
  const [image, setImage] = useState('')
  const [tag, setTag] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [isBestSeller, setIsBestSeller] = useState(false)
  const [isNewArrival, setIsNewArrival] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // Groups filtered by selected category
  const filteredGroups = groups.filter((g) => g.category_id === categoryId)

  useEffect(() => {
    if (open) {
      setName(initial?.name || '')
      setPrice(initial?.price ?? '')
      setCategoryId(initial?.category_id || categories[0]?.id || '')
      setGroupId(initial?.group_id || '')
      setImage(initial?.image_url || '')
      setTag(initial?.tag || '')
      setSortOrder(initial?.sort_order ?? 0)
      setIsBestSeller(initial?.is_best_seller ?? false)
      setIsNewArrival(initial?.is_new_arrival ?? false)
      setError('')
      setBusy(false)
    }
  }, [open, initial, categories])

  // Reset group when category changes (only on user change, not initial load)
  function handleCategoryChange(newCatId) {
    setCategoryId(newCatId)
    setGroupId('')
  }

  async function handleSave() {
    if (!name.trim()) {
      setError('Name is required')
      return
    }
    if (!price || isNaN(Number(price))) {
      setError('Price is required')
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
        name: name.trim(),
        price: Number(price),
        category_id: categoryId,
        group_id: groupId || null,
        image_url: image || null,
        tag: tag.trim() || null,
        sort_order: Number(sortOrder) || 0,
        is_best_seller: isBestSeller,
        is_new_arrival: isNewArrival,
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
                {initial ? 'Edit product' : 'New product'}
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
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g.  Black Case"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="29"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
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
                <label className="form-label">Group (Model)</label>
                <select
                  className="form-input"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">— None —</option>
                  {filteredGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {filteredGroups.length === 0 && categoryId && (
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginTop: 6,
                    }}
                  >
                    No groups for this category yet. Create one in{' '}
                    <strong>Groups</strong>.
                  </div>
                )}
              </div>

              <div className="form-field">
                <label className="form-label">Image</label>
                <ImageUploader
                  value={image}
                  onChange={setImage}
                  folder="products"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Tag (optional)</label>
                <input
                  className="form-input"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. New, Best Seller, Top Rated"
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

              {/* Flags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Toggle
                  label="Show on Best Sellers"
                  value={isBestSeller}
                  onChange={setIsBestSeller}
                />
                <Toggle
                  label="Show on New Arrivals"
                  value={isNewArrival}
                  onChange={setIsNewArrival}
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

function Toggle({ label, value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: 'var(--bg)',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
        {label}
      </span>
      <span
        style={{
          width: 42,
          height: 24,
          borderRadius: 999,
          background: value ? 'var(--accent)' : 'var(--border-strong)',
          position: 'relative',
          transition: 'background 0.2s ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: value ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.2s ease',
          }}
        />
      </span>
    </button>
  )
}