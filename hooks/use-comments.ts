'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'

interface Comment {
  id: string
  user_id: string
  recipe_id: string
  content: string
  created_at: string
  updated_at: string
  profiles: {
    username: string
    avatar_url?: string | null
  } | null
}

export function useComments(recipeId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const supabase = createClient()

  // Récupérer les commentaires
  const fetchComments = async () => {
    setLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .eq('recipe_id', recipeId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (recipeId) {
      fetchComments()
    }
  }, [recipeId])

  // Ajouter un commentaire
  const addComment = async (content: string) => {
    if (!user) {
      alert('Vous devez être connecté pour commenter')
      return
    }

    if (!content.trim()) {
      alert('Le commentaire ne peut pas être vide')
      return
    }

    setSubmitting(true)

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          recipe_id: recipeId,
          user_id: user.id,
          content: content.trim(),
        })
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .single()

      if (error) throw error

      // Ajouter le commentaire en haut de la liste
      setComments([data, ...comments])
      
      return data
    } catch (error) {
      console.error('Error adding comment:', error)
      throw error
    } finally {
      setSubmitting(false)
    }
  }

  // Modifier un commentaire
  const updateComment = async (commentId: string, content: string) => {
    if (!user) return

    if (!content.trim()) {
      alert('Le commentaire ne peut pas être vide')
      return
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ content: content.trim() })
        .eq('id', commentId)
        .eq('user_id', user.id)
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .single()

      if (error) throw error

      // Mettre à jour le commentaire dans la liste
      setComments(comments.map(c => c.id === commentId ? data : c))
      
      return data
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error
    }
  }

  // Supprimer un commentaire
  const deleteComment = async (commentId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id)

      if (error) throw error

      // Retirer le commentaire de la liste
      setComments(comments.filter(c => c.id !== commentId))
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  }

  return {
    comments,
    loading,
    submitting,
    addComment,
    updateComment,
    deleteComment,
    fetchComments,
  }
}