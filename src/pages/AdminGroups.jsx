import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import GroupModal from '../components/GroupModal'

export default function AdminGroups() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [filterCat, setFilterCat] = useState('all')

  async function load() {
    setLoading(true)

    const [groupsRes, catsRes] = await Promise.all([
      supabase
        .from('groups')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true }),
      supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true }),
    ])

    if (groupsRes.error) setError(groupsRes.error.message)
    else setItems(groupsRes.data || [])

    if (!catsRes.error) setCategories(catsRes.data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave(values) {
    if (editing) {
      const { error } = await supabase
        .from('groups')
        .update(values)
        .eq('id', editing.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('groups').insert(values)
      if (error) throw error
    }
    await load()
  }

  async function confirmDelete() {
    if (!deleting) return
    const { error } = await supabase
      .from('groups')
      .delete()
      .eq('id', deleting.id)
    if (error) {
      setError(error.message)
    } else {
      setItems((prev) => prev.filter((i) => i.id !== deleting.id))
    }
    setDeleting(null)
  }

  function categoryName(id) {
    return categories.find((c) => c.id === id)?.title || '—'
  }

  const filtered =
    filterCat === 'all' ? items : items.filter((g) => g.category_id === filterCat)

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
            marginBottom: 32,
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
              Groups
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
            + New group
          </button>
        </div>

        {/* Filter tabs */}
        {categories.length > 0 && (
          <div
            className="brand-row"
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              marginBottom: 24,
              paddingBottom: 4,
            }}
          >
            <button
              onClick={() => setFilterCat('all')}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: '1px solid',
                borderColor:
                  filterCat === 'all' ? 'var(--accent)' : 'var(--border)',
                background:
                  filterCat === 'all' ? 'var(--accent)' : 'transparent',
                color: filterCat === 'all' ? '#000' : 'var(--text)',
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              All
            </button>
            {categories.map((c) => {
              const active = filterCat === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setFilterCat(c.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    border: '1px solid',
                    borderColor: active ? 'var(--accent)' : 'var(--border)',
                    background: active ? 'var(--accent)' : 'transparent',
                    color: active ? '#000' : 'var(--text)',
                    fontSize: 13,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {c.title}
                </button>
              )
            })}
          </div>
        )}

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
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              border: '1px dashed var(--border-strong)',
              borderRadius: 20,
              color: 'var(--muted)',
            }}
          >
            No groups yet. Create your first one.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AnimatePresence initial={false}>
              {filtered.map((g) => (
                <motion.div
                  key={g.id}
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
                      backgroundImage: g.image_url
                        ? `url(${g.image_url})`
                        : 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
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
                      {g.label}
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
                      {categoryName(g.category_id)} · {g.slug}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        setEditing(g)
                        setModalOpen(true)
                      }}
                      className="btn btn-ghost"
                      style={{ padding: '10px 16px', fontSize: 13 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(g)}
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

      <GroupModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSave={handleSave}
        initial={editing}
        categories={categories}
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
                Delete "{deleting.label}"?
              </h3>
              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                This removes it from the website and the database. Products
                inside it will lose their group link. This cannot be undone.
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