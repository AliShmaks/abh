import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CategoryCard from './CategoryCard'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    async function load() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })

      if (!alive) return
      if (!error) setCategories(data || [])
      setLoading(false)
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 24,
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="section-label"
            >
              Shop
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="section-title"
              style={{ marginBottom: 8 }}
            >
              Browse by Phone
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                color: 'var(--muted)',
                fontSize: 16,
                maxWidth: 480,
                margin: 0,
              }}
            >
              Pick your phone model to see covers that fit.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to="/covers"
              className="view-all-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text)',
                paddingBottom: 2,
              }}
            >
              <span className="view-all-underline">Shop all</span>
              <span style={{ fontSize: 16 }}>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ color: 'var(--muted)' }}>Loading...</div>
        ) : categories.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--muted)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 16,
            }}
          >
            No categories yet.
          </div>
        ) : (
          <div className="category-grid">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                image={cat.image_url}
                path={`/${cat.slug}`}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}