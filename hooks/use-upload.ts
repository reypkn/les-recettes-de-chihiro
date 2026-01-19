'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const supabase = createClient()

  const uploadImage = async (file: File, userId: string): Promise<string> => {
    setUploading(true)
    setProgress(0)

    try {
      // Créer un nom de fichier unique
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('recipe-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) throw error

      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(data.path)

      setProgress(100)
      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (url: string) => {
    try {
      // Extraire le path de l'URL
      const path = url.split('/recipe-images/')[1]
      
      const { error } = await supabase.storage
        .from('recipe-images')
        .remove([path])

      if (error) throw error
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }

  return {
    uploadImage,
    deleteImage,
    uploading,
    progress,
  }
}