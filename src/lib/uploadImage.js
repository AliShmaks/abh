import imageCompression from 'browser-image-compression'
import { supabase } from './supabase'

/**
 * Compress an image file to WebP (~200KB target) and upload to Supabase Storage.
 * Returns the public URL.
 */
export async function uploadImage(file, folder = 'general') {
  if (!file) throw new Error('No file provided')

  // Compress + convert to WebP
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.25, // ~250 KB
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.85,
  })

  // Build a unique filename
  const ext = 'webp'
  const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase()
  const filename = `${folder}/${Date.now()}-${base}.${ext}`

  // Upload
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filename, compressed, {
      contentType: 'image/webp',
      upsert: false,
    })

  if (error) throw error

  // Get public URL
  const { data: pub } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path)

  return pub.publicUrl
}

export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}