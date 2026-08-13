import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === "undefined") {
    // Server-side
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pbjaeuhfubmwqczfmnli.supabase.co";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";
    try {
      return createClient(url, anonKey);
    } catch {
      return null;
    }
  }

  // Client-side singleton
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pbjaeuhfubmwqczfmnli.supabase.co";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";
    try {
      supabaseClient = createClient(url, anonKey, {
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      });
    } catch {
      supabaseClient = null;
    }
  }

  return supabaseClient;
}
