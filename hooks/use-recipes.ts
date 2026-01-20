'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'
import { RecipeInput } from '@/lib/validations/recipe.schema'
import { useUpload } from './use-upload'

export function useRecipes() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { uploadImage } = useUpload()
  const supabase = createClient()

  const createRecipe = async (data: RecipeInput) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    console.log('Starting recipe creation...', data)

    try {
      let imageUrl: string | null = null

      // Upload de l'image si elle existe
      if (data.image) {
        console.log('Uploading image...')
        imageUrl = await uploadImage(data.image, user.id)
        console.log('Image uploaded:', imageUrl)
      }

      // Préparer les données de la recette
      const recipeData = {
        user_id: user.id,
        title: data.title,
        description: data.description || null,
        image_url: imageUrl,
        prep_time: data.prep_time || null,
        cook_time: data.cook_time || null,
        servings: data.servings || null,
        difficulty: data.difficulty || null,
        status: 'pending' as const,
      }

      console.log('Creating recipe with data:', recipeData)

      // Créer la recette
      const { data: recipe, error: recipeError } = await supabase
        .from('recipes')
        .insert(recipeData)
        .select()
        .single()

      if (recipeError) {
        console.error('Recipe creation error:', recipeError)
        throw recipeError
      }

      console.log('Recipe created:', recipe)

      // Créer les ingrédients
      const ingredientsToInsert = data.ingredients.map((ingredient, index) => ({
        recipe_id: recipe.id,
        name: ingredient.name,
        quantity: ingredient.quantity,
        order_index: index,
      }))

      console.log('Creating ingredients:', ingredientsToInsert)

      const { error: ingredientsError } = await supabase
        .from('ingredients')
        .insert(ingredientsToInsert)

      if (ingredientsError) {
        console.error('Ingredients creation error:', ingredientsError)
        throw ingredientsError
      }

      // Créer les étapes
      const stepsToInsert = data.steps.map((step, index) => ({
        recipe_id: recipe.id,
        description: step.description,
        order_index: index,
      }))

      console.log('Creating steps:', stepsToInsert)

      const { error: stepsError } = await supabase
        .from('steps')
        .insert(stepsToInsert)

      if (stepsError) {
        console.error('Steps creation error:', stepsError)
        throw stepsError
      }

      console.log('Recipe creation completed successfully!')
      return recipe
    } catch (error) {
      console.error('Error creating recipe:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getRecipes = async (status: 'approved' | 'pending' | 'all' = 'approved') => {
  setLoading(true)
  
    try {
      let query = supabase
        .from('recipes')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          ),
          ingredients (
            id,
            name,
            quantity,
            order_index
          ),
          steps (
            id,
            description,
            order_index
          )
        `)
        .order('created_at', { ascending: false })

      if (status !== 'all') {
        query = query.eq('status', status)
      }

      const { data, error } = await query

      if (error) throw error

      return data
    } catch (error) {
      console.error('Error fetching recipes:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    createRecipe,
    getRecipes,
    loading,
  }
}