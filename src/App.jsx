import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'
import ProductModalQuick from './components/ProductModalQuick'
import WhatsAppFloat from './components/WhatsAppFloat'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Covers from './pages/Covers'
import CategoryPage from './pages/CategoryPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminCategories from './pages/AdminCategories'
import AdminGroups from './pages/AdminGroups'
import AdminProducts from './pages/AdminProducts'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Loader />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/covers" element={<Covers />} />
          <Route path="/covers/:categorySlug" element={<Covers />} />
          <Route
            path="/covers/:categorySlug/:groupSlug"
            element={<Covers />}
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/groups"
            element={
              <ProtectedRoute>
                <AdminGroups />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          {/* Dynamic category — must be last */}
          <Route
            path="/:categorySlug/:groupSlug"
            element={<CategoryPage />}
          />
          <Route path="/:categorySlug" element={<CategoryPage />} />
        </Routes>
      </main>
      <Footer />
      <ProductModalQuick />
      <WhatsAppFloat />
    </>
  )
}