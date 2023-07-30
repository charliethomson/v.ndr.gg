import { createClient } from "@supabase/supabase-js";
import { env } from "../env";
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          createdAt: string | null;
          fullName: string | null;
          src: string | null;
          uid: string;
        };
        Insert: {
          createdAt?: string | null;
          fullName?: string | null;
          src?: string | null;
          uid: string;
        };
        Update: {
          createdAt?: string | null;
          fullName?: string | null;
          src?: string | null;
          uid?: string;
        };
        Relationships: [];
      };
      votes: {
        Row: {
          created_at: string | null;
          expires_at: string | null;
          id: number;
          uid: string | null;
        };
        Insert: {
          created_at?: string | null;
          expires_at?: string | null;
          id?: number;
          uid?: string | null;
        };
        Update: {
          created_at?: string | null;
          expires_at?: string | null;
          id?: number;
          uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "votes_uid_fkey";
            columns: ["uid"];
            referencedRelation: "users";
            referencedColumns: ["uid"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

const supabaseUrl = env.supabase.url;
const supabaseAnonKey = env.supabase.key;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
