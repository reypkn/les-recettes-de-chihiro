import { AuthGuard } from '@/components/auth/auth-guard'

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
        <p className="text-muted-foreground">
          La page de profil sera disponible prochainement...
        </p>
      </div>
    </AuthGuard>
  )
}