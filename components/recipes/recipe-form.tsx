'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { recipeSchema, type RecipeInput } from '@/lib/validations/recipe.schema'
import { useRecipes } from '@/hooks/use-recipes'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, X, Image as ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function RecipeForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { createRecipe, loading } = useRecipes()
  const router = useRouter()

  const form = useForm<RecipeInput>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      prep_time: undefined,
      cook_time: undefined,
      servings: undefined,
      difficulty: undefined,
      ingredients: [{ name: '', quantity: '' }],
      steps: [{ description: '' }],
    },
  })

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: 'steps',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('image', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: RecipeInput) => {
    try {
      setError(null)
      setSuccess(false)
      console.log('Form submitted with data:', data)
      
      await createRecipe(data)
      
      setSuccess(true)
      
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 2000)
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err.message || 'Une erreur est survenue lors de la création de la recette')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image de la recette</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  {imagePreview ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImagePreview(null)
                          form.setValue('image', undefined)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Titre */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de la recette *</FormLabel>
              <FormControl>
                <Input placeholder="Boulettes de riz à la vapeur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre recette inspirée du monde de Chihiro..."
                  className="min-h-25"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Temps et portions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="prep_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Préparation (min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cook_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisson (min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="20"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portions</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="4"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Difficulté */}
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulté</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une difficulté" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="facile">Facile</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="difficile">Difficile</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ingrédients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Ingrédients *</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendIngredient({ name: '', quantity: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un ingrédient
            </Button>
          </div>

          {ingredientFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Farine de riz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormControl>
                      <Input placeholder="200g" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {ingredientFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Étapes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Étapes de préparation *</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendStep({ description: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une étape
            </Button>
          </div>

          {stepFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-muted">
                <span className="text-sm font-semibold">{index + 1}</span>
              </div>

              <FormField
                control={form.control}
                name={`steps.${index}.description`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez cette étape..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {stepFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStep(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {success && (
          <div className="rounded-md bg-green-50 dark:bg-green-950 p-3 text-sm text-green-800 dark:text-green-200">
            ✅ Recette créée avec succès ! Redirection en cours...
          </div>
        )}

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Création...' : 'Créer la recette'}
          </Button>
        </div>
      </form>
    </Form>
  )
}