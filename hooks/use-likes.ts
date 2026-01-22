'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'

export function useLikes(recipeId: string) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const supabase = createClient()

  // Récupérer le nombre de likes et vérifier si l'utilisateur a liké
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // Compter les likes
        const { count, error: countError } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('recipe_id', recipeId)

        if (countError) throw countError
        setLikesCount(count || 0)

        // Vérifier si l'utilisateur a liké
        if (user) {
          const { data, error: likeError } = await supabase
            .from('likes')
            .select('id')
            .eq('recipe_id', recipeId)
            .eq('user_id', user.id)
            .single()

          if (likeError && likeError.code !== 'PGRST116') throw likeError
          setIsLiked(!!data)
        }
      } catch (error) {
        console.error('Error fetching likes:', error)
      }
    }

    if (recipeId) {
      fetchLikes()
    }
  }, [recipeId, user, supabase])

  const toggleLike = async () => {
    if (!user) {
      alert('Vous devez être connecté pour liker une recette')
      return
    }

    setLoading(true)

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('recipe_id', recipeId)
          .eq('user_id', user.id)

        if (error) throw error

        setIsLiked(false)
        setLikesCount((prev) => prev - 1)
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            recipe_id: recipeId,
            user_id: user.id,
          })

        if (error) throw error

        setIsLiked(true)
        setLikesCount((prev) => prev + 1)
      }
    } catch (error: any) {
      console.error('Error toggling like:', error)
      alert('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return {
    isLiked,
    likesCount,
    toggleLike,
    loading,
  }
}