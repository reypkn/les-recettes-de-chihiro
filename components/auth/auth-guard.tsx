'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = true,
  requireAdmin = false,
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Si l'auth est requise et pas d'utilisateur connecté
      if (requireAuth && !user) {
        router.push(redirectTo)
      }
      
      // TODO: Vérifier le rôle admin quand on aura cette info
      // if (requireAdmin && user?.role !== 'admin') {
      //   router.push('/')
      // }
    }
  }, [user, loading, requireAuth, requireAdmin, router, redirectTo])

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Si auth requise et pas d'utilisateur, ne rien afficher (redirection en cours)
  if (requireAuth && !user) {
    return null
  }

  return <>{children}</>
}