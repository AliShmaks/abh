import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { siteData } from '../data/siteData'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', location: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function placeOrder() {
    if (!form.name.trim() || !form.phone.trim() || !form.location.trim()) {
      alert('Please fill in your name, phone, and location.')
      return
    }
    if (items.length === 0) {
      alert('Your cart is empty.')
      return
    }

    const lines = items
      .map((i) => `• ${i.name} x${i.qty} — $${i.price * i.qty}`)
      .join('\n')

    const message =
      `🛒 New Order from ABH\n\n` +
      `${lines}\n\n` +
      `Subtotal: $${subtotal}\n\n` +
      `👤 Name: ${form.name}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📍 Location: ${form.location}\n\n` +
      `(Delivery: $5 Beirut / $6 outside / FREE over $69)`

    const url = `https://wa.me/${siteData.store.whatsapp}?text=${encodeURIComponent(
      message
    )}`

    window.open(url, '_blank')
    clearCart()
  }

  /* ---------- EMPTY STATE ---------- */
  if (items.length === 0) {
    return (
      <section
        style={{
          minHeight: 'calc(100vh - var(--nav-height))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: 400 }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            Your cart is empty
          </h1>

          <p
            style={{
              color: 'var(--muted)',
              fontSize: 15,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Add some cases or shavers and they'll show up here.
          </p>

          <Link to="/cases" className="btn" style={{ width: '100%' }}>
            Start shopping
          </Link>
        </motion.div>
      </section>
    )
  }

  /* ---------- CART ---------- */
  return (
    <section style={{ paddingTop: 60, paddingBottom: 160 }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 40 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 16,
            }}
          >
            Your Bag
          </span>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            Cart
          </h1>
        </motion.div>

        <div className="cart-layout">
          {/* ---------- ITEMS ---------- */}
          <div className="cart-items">
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="cart-item"
                >
                  <Link
                    to="/cases"
                    className="cart-item-image"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />

                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cart-item-remove"
                        aria-label="Remove"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="qty-control">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="qty-btn"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="qty-btn"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-price">
                        ${item.price * item.qty}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Delivery note */}
            <div className="delivery-note">
              <span style={{ fontSize: 18 }}>🚚</span>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    marginBottom: 2,
                    color: 'var(--text)',
                  }}
                >
                  Delivery info
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                  $5 inside Beirut · $6 outside Beirut · <strong>FREE</strong>{' '}
                  on orders over $69
                </div>
              </div>
            </div>
          </div>

          {/* ---------- FORM + SUMMARY ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="cart-form-wrap"
          >
            <div className="cart-form">
              <h2 className="cart-form-title">Delivery details</h2>

              <div className="form-field">
                <label className="form-label">Full name</label>
                <input
                  name="name"
                  placeholder="e.g. Ali"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Phone number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="e.g. 77 777 777"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Delivery address</label>
                <textarea
                  name="location"
                  placeholder="Building, street, area, floor..."
                  value={form.location}
                  onChange={handleChange}
                  rows={3}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery</span>
                  <span
                    style={{
                      color: 'var(--muted)',
                      fontSize: 13,
                      fontStyle: 'italic',
                    }}
                  >
                    confirmed on WhatsApp
                  </span>
                </div>
                <div className="cart-summary-divider" />
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span>${subtotal}</span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={placeOrder}
                className="btn"
                style={{
                  width: '100%',
                  padding: '18px 28px',
                  fontSize: 16,
                  marginTop: 8,
                }}
              >
                Place order on WhatsApp
                <span style={{ fontSize: 18 }}>→</span>
              </motion.button>

              <p
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  textAlign: 'center',
                  marginTop: 12,
                  lineHeight: 1.5,
                }}
              >
                You'll be redirected to WhatsApp to confirm your order.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- STICKY CHECKOUT (MOBILE ONLY) ---------- */}
      <div className="mobile-checkout">
        <div className="mobile-checkout-inner">
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              Total
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'var(--accent)',
              }}
            >
              ${subtotal}
            </div>
          </div>
          <button
            onClick={placeOrder}
            className="btn"
            style={{
              padding: '14px 24px',
              fontSize: 15,
              flex: 1,
              maxWidth: 220,
            }}
          >
            Place order
          </button>
        </div>
      </div>
    </section>
  )
}