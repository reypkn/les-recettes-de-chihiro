'use client'

import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Clock, Users, ChefHat, Calendar } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.locale('fr')

interface RecipeDetailProps {
  recipe: {
    id: string
    title: string
    description?: string | null
    image_url?: string | null
    prep_time?: number | null
    cook_time?: number | null
    servings?: number | null
    difficulty?: 'facile' | 'moyen' | 'difficile' | null
    created_at: string
    profiles: {
      id: string
      username: string
      avatar_url?: string | null
    } | null
    ingredients: Array<{
      id: string
      name: string
      quantity: string
      order_index: number
    }>
    steps: Array<{
      id: string
      description: string
      order_index: number
    }>
  }
}

const difficultyColors = {
  facile: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  moyen: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  difficile: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)

  return (
    <div className="space-y-8">
      {/* Image principale */}
      <div className="relative w-full h-100 rounded-lg overflow-hidden bg-muted">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ChefHat className="h-24 w-24 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <h1 className="text-4xl font-bold tracking-tight">{recipe.title}</h1>
            {recipe.description && (
              <p className="text-lg text-muted-foreground">{recipe.description}</p>
            )}
          </div>
          {recipe.difficulty && (
            <Badge className={difficultyColors[recipe.difficulty]} variant="secondary">
              {recipe.difficulty}
            </Badge>
          )}
        </div>

        {/* Auteur */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={recipe.profiles?.avatar_url || ''} />
            <AvatarFallback>
              {recipe.profiles?.username?.substring(0, 2).toUpperCase() || 'UN'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{recipe.profiles?.username || 'Anonyme'}</p>
            <p className="text-sm text-muted-foreground">
              Publié {dayjs(recipe.created_at).fromNow()}
            </p>
          </div>
        </div>

        <Separator />

        {/* Infos rapides */}
        <div className="flex flex-wrap gap-6 text-sm">
          {recipe.prep_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Préparation</p>
                <p className="text-muted-foreground">{recipe.prep_time} min</p>
              </div>
            </div>
          )}
          {recipe.cook_time && (
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Cuisson</p>
                <p className="text-muted-foreground">{recipe.cook_time} min</p>
              </div>
            </div>
          )}
          {totalTime > 0 && (
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Total</p>
                <p className="text-muted-foreground">{totalTime} min</p>
              </div>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Portions</p>
                <p className="text-muted-foreground">{recipe.servings} personnes</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Ingrédients et Étapes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ingrédients */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ingrédients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <div className="flex-1">
                      <span className="font-medium">{ingredient.quantity}</span>
                      <span className="text-muted-foreground"> {ingredient.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Étapes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Préparation</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6">
                {recipe.steps.map((step, index) => (
                  <li key={step.id} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}