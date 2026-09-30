import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useProductModal } from '../context/ProductModalContext'

export default function ProductModalQuick() {
  const { product, closeProduct } = useProductModal()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  // Lock scroll while open
  useEffect(() => {
    if (!product) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [product])

  // ESC to close
  useEffect(() => {
    if (!product) return
    function onKey(e) {
      if (e.key === 'Escape') closeProduct()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, closeProduct])

  // Reset "added" when opening a new product
  useEffect(() => {
    setAdded(false)
  }, [product])

  function handleAdd() {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeProduct}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(10, 10, 10, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="product-modal"
          >
            {/* Close */}
            <button
              onClick={closeProduct}
              aria-label="Close"
              className="product-modal-close"
            >
              ×
            </button>

            {/* Image side */}
            <div className="product-modal-image">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-modal-img"
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--bg-soft)',
                  }}
                />
              )}
            </div>

            {/* Info side */}
            <div className="product-modal-info">
              {product.tag && (
                <span className="product-modal-tag">{product.tag}</span>
              )}

              <h2 className="product-modal-title">{product.name}</h2>

              <div className="product-modal-price">${product.price}</div>

              <p className="product-modal-desc">
                Slim, protective, and built to last. Designed for everyday use.
              </p>

              <button
                onClick={handleAdd}
                className={`product-modal-btn ${added ? 'is-added' : ''}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="product-modal-btn-inner"
                    >
                      <CheckIcon />
                      Added to cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="product-modal-btn-inner"
                    >
                      <CartIcon />
                      Add to cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
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
      width="16"
      height="16"
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