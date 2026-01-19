import { AuthGuard } from '@/components/auth/auth-guard'
import { RecipeForm } from '@/components/recipes/recipe-form'

export default function CreateRecipePage() {
  return (
    <AuthGuard>
      <div className="container max-w-3xl py-12">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Créer une recette</h1>
            <p className="text-muted-foreground mt-2">
              Partagez vos créations culinaires inspirées du monde de Chihiro
            </p>
          </div>

          <RecipeForm />
        </div>
      </div>
    </AuthGuard>
  )
}