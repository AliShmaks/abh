import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { uploadImage, formatBytes } from '../lib/uploadImage'

export default function ImageUploader({ value, onChange, folder = 'general' }) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  async function handleFiles(files) {
    const file = files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file')
      return
    }

    setError('')
    setBusy(true)
    setInfo(null)

    try {
      const beforeSize = file.size
      const url = await uploadImage(file, folder)
      onChange(url)
      setInfo(`Uploaded · ${formatBytes(beforeSize)} → WebP`)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  function onPick(e) {
    handleFiles(e.target.files)
    e.target.value = ''
  }

  return (
    <div>
      <div
        onClick={() => !busy && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          borderRadius: 14,
          border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border-strong)'}`,
          background: dragOver ? 'rgba(245,166,35,0.06)' : 'var(--bg)',
          cursor: busy ? 'wait' : 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
                setInfo(null)
              }}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 32,
                height: 32,
                borderRadius: 999,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                fontSize: 18,
              }}
            >
              ×
            </button>
          </>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: 24,
              color: 'var(--muted)',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>📷</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: 4,
              }}
            >
              {busy ? 'Uploading & converting...' : 'Add image'}
            </div>
            <div style={{ fontSize: 12 }}>Tap to choose · or drag & drop</div>
            <div style={{ fontSize: 11, marginTop: 8, color: 'var(--muted)' }}>
              Auto-converts to WebP
            </div>
          </div>
        )}

        {busy && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.2)',
                borderTopColor: 'var(--accent)',
                marginRight: 12,
              }}
            />
            Converting...
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onPick}
        style={{ display: 'none' }}
      />

      {info && (
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--accent)' }}>
          ✓ {info}
        </div>
      )}
      {error && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#ff8080' }}>
          {error}
        </div>
      )}
    </div>
  )
}