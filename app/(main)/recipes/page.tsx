'use client'

import { useEffect, useState } from 'react'
import { RecipeCard } from '@/components/recipes/recipe-card'
import { useRecipes } from '@/hooks/use-recipes'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Loader2 } from 'lucide-react'

export default function RecipesPage() {
  const { getRecipes, loading } = useRecipes()
  const [recipes, setRecipes] = useState<any[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes('approved')
        setRecipes(data || [])
        setFilteredRecipes(data || [])
      } catch (error) {
        console.error('Error loading recipes:', error)
      }
    }

    fetchRecipes()
  }, [])

  // Filtrer les recettes
  useEffect(() => {
    let filtered = recipes

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtre par difficulté
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter((recipe) => recipe.difficulty === difficultyFilter)
    }

    setFilteredRecipes(filtered)
  }, [searchQuery, difficultyFilter, recipes])

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Toutes les recettes</h1>
          <p className="text-muted-foreground">
            Découvrez {recipes.length} recette{recipes.length > 1 ? 's' : ''} inspirée{recipes.length > 1 ? 's' : ''} du monde de Chihiro
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une recette..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-50">
              <SelectValue placeholder="Difficulté" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes difficultés</SelectItem>
              <SelectItem value="facile">Facile</SelectItem>
              <SelectItem value="moyen">Moyen</SelectItem>
              <SelectItem value="difficile">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des recettes */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || difficultyFilter !== 'all'
                ? 'Aucune recette ne correspond à vos critères'
                : 'Aucune recette disponible pour le moment'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}