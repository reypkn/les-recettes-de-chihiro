'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { RecipeDetail } from '@/components/recipes/recipe-detail'
import { useRecipes } from '@/hooks/use-recipes'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getRecipeById, loading } = useRecipes()
  const [recipe, setRecipe] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setError(null)
        const data = await getRecipeById(params.id as string)
        setRecipe(data)
      } catch (err: any) {
        console.error('Error loading recipe:', err)
        setError('Recette introuvable')
      }
    }

    if (params.id) {
      fetchRecipe()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="container py-12">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">{error || 'Recette introuvable'}</h1>
          <p className="text-muted-foreground">
            Cette recette n'existe pas ou a été supprimée.
          </p>
          <Button asChild>
            <Link href="/recipes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux recettes
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Bouton retour */}
        <Button variant="ghost" asChild>
          <Link href="/recipes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux recettes
          </Link>
        </Button>

        {/* Détail de la recette */}
        <RecipeDetail recipe={recipe} />
      </div>
    </div>
  )
}