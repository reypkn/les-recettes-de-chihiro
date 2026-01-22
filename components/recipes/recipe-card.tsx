'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ChefHat, Heart, MessageCircle } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'
import { LikeButton } from './like-button'

dayjs.extend(relativeTime)
dayjs.locale('fr')

interface RecipeCardProps {
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
      username: string
      avatar_url?: string | null
    } | null
  }
  likesCount?: number
  commentsCount?: number
}

const difficultyColors = {
  facile: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  moyen: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  difficile: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function RecipeCard({ recipe, likesCount = 0, commentsCount = 0 }: RecipeCardProps) {
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer h-full">
        {/* Image */}
        <div className="relative h-48 w-full bg-muted">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ChefHat className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          {recipe.difficulty && (
            <Badge className={`absolute top-2 right-2 ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </Badge>
          )}
        </div>

        <CardHeader className="pb-3">
          <h3 className="font-semibold text-lg line-clamp-2">{recipe.title}</h3>
          {recipe.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {recipe.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {totalTime > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{totalTime} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} pers.</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t flex items-center justify-between">
  <div className="flex items-center gap-2">
    <Avatar className="h-6 w-6">
      <AvatarImage src={recipe.profiles?.avatar_url || ''} />
      <AvatarFallback className="text-xs">
        {recipe.profiles?.username?.substring(0, 2).toUpperCase() || 'UN'}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col">
      <span className="text-xs font-medium">
        {recipe.profiles?.username || 'Anonyme'}
      </span>
      <span className="text-xs text-muted-foreground">
        {dayjs(recipe.created_at).fromNow()}
      </span>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <LikeButton recipeId={recipe.id} variant="icon" />
    <div className="flex items-center gap-1 text-muted-foreground">
      <MessageCircle className="h-4 w-4" />
      <span className="text-xs">{commentsCount}</span>
    </div>
  </div>
</CardFooter>
      </Card>
    </Link>
  )
}