'use client'

import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useLikes } from '@/hooks/use-likes'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  recipeId: string
  variant?: 'default' | 'icon'
  className?: string
}

export function LikeButton({ recipeId, variant = 'default', className }: LikeButtonProps) {
  const { isLiked, likesCount, toggleLike, loading } = useLikes(recipeId)

  if (variant === 'icon') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleLike()
        }}
        disabled={loading}
        className={cn(
          'flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
          isLiked && 'text-red-500 hover:text-red-600',
          className
        )}
      >
        <Heart
          className={cn('h-4 w-4', isLiked && 'fill-current')}
        />
        <span className="text-xs">{likesCount}</span>
      </button>
    )
  }

  return (
    <Button
      variant={isLiked ? 'default' : 'outline'}
      size="lg"
      onClick={toggleLike}
      disabled={loading}
      className={cn(
        'gap-2',
        isLiked && 'bg-red-500 hover:bg-red-600 text-white',
        className
      )}
    >
      <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
      <span>{isLiked ? 'Liké' : 'Liker'}</span>
      <span className="font-semibold">({likesCount})</span>
    </Button>
  )
}