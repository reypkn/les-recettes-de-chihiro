'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<any>
  submitting: boolean
  placeholder?: string
  initialValue?: string
  onCancel?: () => void
}

export function CommentForm({ 
  onSubmit, 
  submitting, 
  placeholder = 'Écrivez votre commentaire...',
  initialValue = '',
  onCancel 
}: CommentFormProps) {
  const [content, setContent] = useState(initialValue)
  const { user, profile } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return

    try {
      await onSubmit(content)
      setContent('')
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  if (!user) {
    return (
      <div className="text-center p-6 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground mb-4">
          Connectez-vous pour laisser un commentaire
        </p>
        <Button asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={profile?.avatar_url || ''} />
          <AvatarFallback>
            {profile?.username?.substring(0, 2).toUpperCase() || 'UN'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-25"
            disabled={submitting}
          />

          <div className="flex gap-2">
            <Button type="submit" disabled={submitting || !content.trim()}>
              {submitting ? 'Envoi...' : initialValue ? 'Modifier' : 'Commenter'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}