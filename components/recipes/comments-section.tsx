'use client'

import { useComments } from '@/hooks/use-comments'
import { CommentForm } from './comment-form'
import { CommentItem } from './comment-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MessageCircle, Loader2 } from 'lucide-react'

interface CommentsSectionProps {
  recipeId: string
}

export function CommentsSection({ recipeId }: CommentsSectionProps) {
  const { 
    comments, 
    loading, 
    submitting, 
    addComment, 
    updateComment, 
    deleteComment 
  } = useComments(recipeId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Commentaires ({comments.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Formulaire d'ajout */}
        <CommentForm onSubmit={addComment} submitting={submitting} />

        <Separator />

        {/* Liste des commentaires */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucun commentaire pour le moment. Soyez le premier à commenter !
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onUpdate={updateComment}
                onDelete={deleteComment}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}