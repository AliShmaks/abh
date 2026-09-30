export default function SortBar({ sort, setSort, count }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        paddingBottom: 24,
        borderBottom: '1px solid var(--border)',
        marginBottom: 40,
      }}
    >
      <span
        style={{
          color: 'var(--muted)',
          fontSize: 13,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {count} products
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--muted)', fontSize: 13 }}>Sort by</span>

        <div style={{ position: 'relative' }}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
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
              minWidth: 180,
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="name-asc">Name: A to Z</option>
          </select>

          {/* Custom chevron */}
          <span
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: 'var(--accent)',
              fontSize: 12,
            }}
          >
            ▾
          </span>
        </div>
      </div>
    </div>
  )
}