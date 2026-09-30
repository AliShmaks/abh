import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useProductModal } from '../context/ProductModalContext'

export default function ProductCard({ id, name, price, image, tag, index = 0 }) {
  const { addItem } = useCart()
  const { openProduct } = useProductModal()
  const [added, setAdded] = useState(false)

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id, name, price, image })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  function handleOpen() {
    openProduct({ id, name, price, image_url: image, tag })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="product-card"
    >
      {/* Image — clickable */}
      <div
        onClick={handleOpen}
        className="product-image-frame"
        style={{ cursor: 'pointer' }}
      >
        {image && <img src={image} alt={name} className="product-image" />}
        {tag && <span className="product-tag">{tag}</span>}
      </div>

      {/* Name + price */}
      <div className="product-row">
        <h3
          className="product-name"
          onClick={handleOpen}
          style={{ cursor: 'pointer' }}
        >
          {name}
        </h3>
        <span className="product-price">${price}</span>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        className={`product-add-btn ${added ? 'is-added' : ''}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <CheckIcon />
              Added
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <CartIcon />
              Add to cart
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

function CartIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}