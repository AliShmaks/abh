import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CategoryCard({
  title,
  image,
  path,
  index = 0,
}) {
  const hasImage = !!image

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={path}
        className="category-card"
        style={{
          display: 'block',
          textDecoration: 'none',
        }}
      >
        {/* Image with hover overlay */}
        <div className="category-image-frame">
          {hasImage && (
            <motion.img
              src={image}
              alt={title}
              className="category-image"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {/* Hover gradient */}
          <div className="category-hover-overlay" />

          {/* "Shop now" pill — appears on hover */}
          <div className="category-cta">
            <span>Shop now</span>
            <span style={{ fontSize: 14 }}>→</span>
          </div>
        </div>

        {/* Name + arrow */}
        <div className="category-footer">
          <span className="category-title">{title}</span>
          <span className="category-arrow">→</span>
        </div>
      </Link>
    </motion.div>
  )
}