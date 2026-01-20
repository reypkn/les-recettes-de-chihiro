import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Le nom de l\'ingrédient est requis'),
  quantity: z.string().min(1, 'La quantité est requise'),
})

export const stepSchema = z.object({
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
})

export const recipeSchema = z.object({
  title: z.string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: z.string().optional(),
  prep_time: z.number().optional(),
  cook_time: z.number().optional(),
  servings: z.number().optional(),
  difficulty: z.enum(['facile', 'moyen', 'difficile']).optional(),
  ingredients: z.array(ingredientSchema)
    .min(1, 'Au moins un ingrédient est requis'),
  steps: z.array(stepSchema)
    .min(1, 'Au moins une étape est requise'),
  image: z.instanceof(File).optional(),
})

export type RecipeInput = z.infer<typeof recipeSchema>
export type IngredientInput = z.infer<typeof ingredientSchema>
export type StepInput = z.infer<typeof stepSchema>