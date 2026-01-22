'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { MoreVertical, Edit, Trash } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { CommentForm } from './comment-form'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.locale('fr')

interface CommentItemProps {
  comment: {
    id: string
    user_id: string
    content: string
    created_at: string
    updated_at: string
    profiles: {
      username: string
      avatar_url?: string | null
    } | null
  }
  onUpdate: (commentId: string, content: string) => Promise<any>
  onDelete: (commentId: string) => Promise<void>
}

export function CommentItem({ comment, onUpdate, onDelete }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { user } = useAuth()

  const isOwner = user?.id === comment.user_id
  const isEdited = comment.created_at !== comment.updated_at

  const handleUpdate = async (content: string) => {
    await onUpdate(comment.id, content)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    await onDelete(comment.id)
    setShowDeleteDialog(false)
  }

  if (isEditing) {
    return (
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.profiles?.avatar_url || ''} />
          <AvatarFallback>
            {comment.profiles?.username?.substring(0, 2).toUpperCase() || 'UN'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <CommentForm
            onSubmit={handleUpdate}
            submitting={false}
            placeholder="Modifiez votre commentaire..."
            initialValue={comment.content}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex gap-3 group">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.profiles?.avatar_url || ''} />
          <AvatarFallback>
            {comment.profiles?.username?.substring(0, 2).toUpperCase() || 'UN'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">
                {comment.profiles?.username || 'Anonyme'}
              </span>
              <span className="text-xs text-muted-foreground">
                {dayjs(comment.created_at).fromNow()}
                {isEdited && ' (modifié)'}
              </span>
            </div>

            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {comment.content}
          </p>
        </div>
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le commentaire ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Votre commentaire sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}