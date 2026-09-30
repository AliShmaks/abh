import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'
import SortBar from '../components/SortBar'

export default function Covers() {
  const { categorySlug, groupSlug } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [groups, setGroups] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    let alive = true

    async function load() {
      setLoading(true)
      setError('')

      const [catRes, groupsRes, productsRes] = await Promise.all([
        supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('groups')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('products')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false }),
      ])

      if (!alive) return

      if (catRes.error) setError(catRes.error.message)
      else setCategories(catRes.data || [])

      if (groupsRes.error) setError(groupsRes.error.message)
      else setGroups(groupsRes.data || [])

      if (productsRes.error) setError(productsRes.error.message)
      else setProducts(productsRes.data || [])

      setLoading(false)
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  // Which category is currently selected (from URL)
  const activeCategory = useMemo(() => {
    if (!categorySlug) return null
    return categories.find((c) => c.slug === categorySlug) || null
  }, [categories, categorySlug])

  // Which group is currently selected (from URL)
  const activeGroup = useMemo(() => {
    if (!groupSlug) return null
    return groups.find((g) => g.slug === groupSlug) || null
  }, [groups, groupSlug])

  // Groups filtered by the active category
  const groupsForCategory = useMemo(() => {
    if (!activeCategory) return groups
    return groups.filter((g) => g.category_id === activeCategory.id)
  }, [groups, activeCategory])

  const filtered = useMemo(() => {
    let list = [...products]

    if (activeCategory) {
      list = list.filter((p) => p.category_id === activeCategory.id)
    }

    if (activeGroup) {
      list = list.filter((p) => p.group_id === activeGroup.id)
    }

    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'name-asc')
      list.sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [products, activeCategory, activeGroup, sort])

  function handleCategoryChange(newSlug) {
    if (newSlug === 'all') {
      navigate('/covers')
    } else {
      navigate(`/covers/${newSlug}`)
    }
  }

  function handleGroupChange(newSlug) {
    if (newSlug === 'all') {
      navigate(`/covers/${activeCategory.slug}`)
    } else {
      navigate(`/covers/${activeCategory.slug}/${newSlug}`)
    }
  }

  if (loading) {
    return (
      <section style={{ paddingTop: 160, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ color: 'var(--muted)' }}>Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* HERO */}
      <section
        style={{
          paddingTop: 72,
          paddingBottom: 48,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="section-label"
            style={{ marginBottom: 20 }}
          >
            Collection
          </motion.div>

          <motion.h1
            key={activeGroup?.id || activeCategory?.id || 'all'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: 'clamp(44px, 7vw, 96px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              marginBottom: 20,
              maxWidth: 900,
            }}
          >
            {activeGroup
              ? `${activeGroup.label} Covers`
              : activeCategory
              ? `${activeCategory.title} Covers`
              : 'All Covers'}
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
              fontSize: 17,
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Every cover we make. For every phone.
          </motion.p>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section style={{ paddingTop: 32, paddingBottom: 120 }}>
        <div className="container">
          {/* Dropdowns */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24,
              flexWrap: 'wrap',
            }}
          >
            {/* Brand dropdown */}
            {categories.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  Brand
                </span>
                <div style={{ position: 'relative' }}>
                  <select
                    value={activeCategory?.slug || 'all'}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{
                      appearance: 'none',
                      background: 'var(--surface)',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                      borderRadius: 999,
                      padding: '10px 40px 10px 18px',
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      outline: 'none',
                      minWidth: 160,
                    }}
                  >
                    <option value="all">All brands</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--accent)',
                      fontSize: 11,
                    }}
                  >
                    ▾
                  </span>
                </div>
              </div>
            )}

            {/* Model dropdown — only when a brand is selected */}
            {activeCategory && groupsForCategory.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  Model
                </span>
                <div style={{ position: 'relative' }}>
                  <select
                    value={activeGroup?.slug || 'all'}
                    onChange={(e) => handleGroupChange(e.target.value)}
                    style={{
                      appearance: 'none',
                      background: 'var(--surface)',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                      borderRadius: 999,
                      padding: '10px 40px 10px 18px',
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      outline: 'none',
                      minWidth: 160,
                    }}
                  >
                    <option value="all">All models</option>
                    {groupsForCategory.map((g) => (
                      <option key={g.id} value={g.slug}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--accent)',
                      fontSize: 11,
                    }}
                  >
                    ▾
                  </span>
                </div>
              </div>
            )}
          </div>

          <SortBar sort={sort} setSort={setSort} count={filtered.length} />

          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '120px 20px',
                color: 'var(--muted)',
                border: '1px dashed var(--border-strong)',
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: 8,
                }}
              >
                No covers yet
              </div>
              <div style={{ fontSize: 14 }}>
                Try another brand or model.
              </div>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image_url}
                  tag={p.tag}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}