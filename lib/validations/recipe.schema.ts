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
  description: z.string()
    .min(20, 'La description doit contenir au moins 20 caractères')
    .max(1000, 'La description ne peut pas dépasser 1000 caractères')
    .optional()
    .or(z.literal('')),
  prep_time: z.number()
    .min(1, 'Le temps de préparation doit être supérieur à 0')
    .max(1440, 'Le temps de préparation ne peut pas dépasser 24h')
    .optional()
    .or(z.literal(0))
    .transform(val => val === 0 ? undefined : val),
  cook_time: z.number()
    .min(1, 'Le temps de cuisson doit être supérieur à 0')
    .max(1440, 'Le temps de cuisson ne peut pas dépasser 24h')
    .optional()
    .or(z.literal(0))
    .transform(val => val === 0 ? undefined : val),
  servings: z.number()
    .min(1, 'Le nombre de portions doit être supérieur à 0')
    .max(100, 'Le nombre de portions ne peut pas dépasser 100')
    .optional()
    .or(z.literal(0))
    .transform(val => val === 0 ? undefined : val),
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