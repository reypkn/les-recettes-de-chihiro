'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RecipeCard } from '@/components/recipes/recipe-card'
import { useRecipes } from '@/hooks/use-recipes'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function HomePage() {
  const { getRecipes, loading } = useRecipes()
  const [latestRecipes, setLatestRecipes] = useState<any[]>([])

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const data = await getRecipes('approved')
        // Prendre uniquement les 3 dernières recettes
        setLatestRecipes(data?.slice(0, 3) || [])
      } catch (error) {
        console.error('Error loading latest recipes:', error)
      }
    }

    fetchLatestRecipes()
  }, [])

  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Bienvenue sur Chihiro Recipes
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez des recettes magiques inspirées de l'univers enchanteur du Voyage de Chihiro
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/recipes">Voir les recettes</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/recipes/create">Créer une recette</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🍜 Recettes Authentiques</h3>
          <p className="text-muted-foreground">
            Des plats inspirés des délices du monde de Chihiro
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">👨‍🍳 Communauté</h3>
          <p className="text-muted-foreground">
            Partagez vos créations culinaires avec d'autres fans
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">✨ Magie Culinaire</h3>
          <p className="text-muted-foreground">
            Transformez votre cuisine en une aventure enchanteresse
          </p>
        </div>
      </div>

      {/* Dernières recettes */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Dernières recettes</h2>
          <Button variant="ghost" asChild>
            <Link href="/recipes" className="gap-2">
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : latestRecipes.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">
              Aucune recette disponible pour le moment.
            </p>
            <Button asChild className="mt-4">
              <Link href="/recipes/create">Créer la première recette</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}