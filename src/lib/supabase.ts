import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      teachers: {
        Row: {
          id: string
          name: string
          subject: string
          description: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          subject: string
          description: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject?: string
          description?: string
          image_url?: string
          created_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          category?: string
          created_at?: string
        }
      }
      school_profile: {
        Row: {
          id: string
          section: string
          content: any
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          content: any
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          content?: any
          updated_at?: string
        }
      }
    }
  }
}