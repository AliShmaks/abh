import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import CategoryModal from '../components/CategoryModal'

export default function AdminCategories() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) setError(error.message)
    else setItems(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave(values) {
    if (editing) {
      const { error } = await supabase
        .from('categories')
        .update(values)
        .eq('id', editing.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('categories').insert(values)
      if (error) throw error
    }
    await load()
  }

  async function confirmDelete() {
    if (!deleting) return
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', deleting.id)
    if (error) {
      setError(error.message)
    } else {
      setItems((prev) => prev.filter((i) => i.id !== deleting.id))
    }
    setDeleting(null)
  }

  return (
    <section className="section" style={{ paddingTop: 60 }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          <div>
            <Link
              to="/admin/dashboard"
              style={{
                fontSize: 12,
                color: 'var(--muted)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: 12,
              }}
            >
              ← Dashboard
            </Link>
            <h1 className="section-title" style={{ marginBottom: 0 }}>
              Categories
            </h1>
          </div>

          <button
            onClick={() => {
              setEditing(null)
              setModalOpen(true)
            }}
            className="btn"
            style={{ padding: '12px 22px', fontSize: 14 }}
          >
            + New category
          </button>
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
              marginBottom: 24,
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ color: 'var(--muted)' }}>Loading...</div>
        ) : items.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              border: '1px dashed var(--border-strong)',
              borderRadius: 20,
              color: 'var(--muted)',
            }}
          >
            No categories yet. Create your first one.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimatePresence initial={false}>
              {items.map((cat) => (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: cat.image_url
                        ? `url(${cat.image_url}) center/cover`
                        : 'var(--bg)',
                      border: '1px solid var(--border)',
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        marginBottom: 2,
                      }}
                    >
                      {cat.title}
                    </div>
                    <div
                      style={{
                        color: 'var(--muted)',
                        fontSize: 13,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cat.slug} · {cat.subtitle || 'no subtitle'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        setEditing(cat)
                        setModalOpen(true)
                      }}
                      className="btn btn-ghost"
                      style={{ padding: '10px 16px', fontSize: 13 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(cat)}
                      style={{
                        padding: '10px 16px',
                        fontSize: 13,
                        borderRadius: 999,
                        background: 'rgba(255,80,80,0.1)',
                        color: '#ff8080',
                        fontWeight: 700,
                        border: '1px solid rgba(255,80,80,0.3)',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <CategoryModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSave={handleSave}
        initial={editing}
      />

      <AnimatePresence>
        {deleting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleting(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 420,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: 12,
                }}
              >
                Delete "{deleting.title}"?
              </h3>
              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                This removes it from the website and the database. All groups
                and products inside it will be deleted too. This cannot be
                undone.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  flexDirection: 'row-reverse',
                }}
              >
                <button
                  onClick={confirmDelete}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 999,
                    background: '#ff5050',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleting(null)}
                  className="btn btn-ghost"
                  style={{ padding: '14px 24px', fontSize: 14 }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}