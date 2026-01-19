import { AuthGuard } from '@/components/auth/auth-guard'

export default function CreateRecipePage() {
  return (
    <AuthGuard>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Créer une recette</h1>
        <p className="text-muted-foreground">
          Le formulaire de création de recette sera disponible prochainement...
        </p>
      </div>
    </AuthGuard>
  )
}