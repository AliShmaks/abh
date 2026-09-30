import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductCard from './ProductCard'

export default function ProductSection({ title, subtitle, filter, viewAllPath }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    async function load() {
      let query = supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (filter === 'best') {
        query = query.eq('is_best_seller', true)
      } else if (filter === 'new') {
        query = query.eq('is_new_arrival', true)
      }

      const { data, error } = await query.limit(8)

      if (!alive) return
      if (error) console.error('Products fetch error:', error)
      if (!error) setProducts(data || [])
      setLoading(false)
    }

    load()
    return () => {
      alive = false
    }
  }, [filter])

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
            marginBottom: 40,
          }}
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="section-title"
              style={{ marginBottom: subtitle ? 8 : 0 }}
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  color: 'var(--muted)',
                  fontSize: 15,
                  maxWidth: 480,
                  margin: 0,
                }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {viewAllPath && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={viewAllPath}
                className="view-all-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text)',
                  paddingBottom: 2,
                  position: 'relative',
                }}
              >
                <span className="view-all-underline">View all</span>
                <span style={{ fontSize: 16 }}>→</span>
              </Link>
            </motion.div>
          )}
        </div>

        {loading ? (
          <div style={{ color: 'var(--muted)' }}>Loading...</div>
        ) : products.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--muted)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 16,
            }}
          >
            No products yet. Add some in the admin panel.
          </div>
        ) : (
          <div className="product-scroll-row">
            {products.map((p, i) => (
              <div key={p.id} className="product-scroll-item">
                <ProductCard
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image_url}
                  tag={p.tag}
                  index={i}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}