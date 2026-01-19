export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'user' | 'admin'
export type RecipeStatus = 'pending' | 'approved' | 'rejected'
export type Difficulty = 'facile' | 'moyen' | 'difficile'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          bio: string | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          bio?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          bio?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          image_url: string | null
          prep_time: number | null
          cook_time: number | null
          servings: number | null
          difficulty: Difficulty | null
          status: RecipeStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          image_url?: string | null
          prep_time?: number | null
          cook_time?: number | null
          servings?: number | null
          difficulty?: Difficulty | null
          status?: RecipeStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          prep_time?: number | null
          cook_time?: number | null
          servings?: number | null
          difficulty?: Difficulty | null
          status?: RecipeStatus
          created_at?: string
          updated_at?: string
        }
      }
      // Ajoute les autres tables si besoin...
    }
  }
}