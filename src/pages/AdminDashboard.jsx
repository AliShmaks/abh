import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { user, signOut } = useAuth()

  return (
    <section className="section">
      <div className="container">
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
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 12,
              }}
            >
              Admin
            </div>
            <h1 className="section-title">Dashboard</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              Logged in as <strong>{user?.email}</strong>
            </p>
          </div>

          <button
            onClick={signOut}
            className="btn btn-ghost"
            style={{ padding: '10px 20px', fontSize: 14 }}
          >
            Sign out
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {[
            { label: 'Categories', path: '/admin/categories' },
            { label: 'Groups', path: '/admin/groups' },
            { label: 'Products', path: '/admin/products' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="card"
              style={{
                padding: 32,
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: 6,
                }}
              >
                {item.label}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                Manage {item.label.toLowerCase()}
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            padding: 24,
            border: '1px dashed var(--border-strong)',
            borderRadius: 12,
            color: 'var(--muted)',
            fontSize: 14,
          }}
        >
          🚧 The CRUD pages (add/edit/delete) come next. Right now the routing
          and login work.
        </div>
      </div>
    </section>
  )
}