import { createContext, useContext, useState } from 'react'

const ProductModalContext = createContext(null)

export function ProductModalProvider({ children }) {
  const [product, setProduct] = useState(null)

  function openProduct(p) {
    setProduct(p)
  }

  function closeProduct() {
    setProduct(null)
  }

  return (
    <ProductModalContext.Provider
      value={{ product, openProduct, closeProduct }}
    >
      {children}
    </ProductModalContext.Provider>
  )
}

export function useProductModal() {
  const ctx = useContext(ProductModalContext)
  if (!ctx) throw new Error('useProductModal must be inside ProductModalProvider')
  return ctx
}