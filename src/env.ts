export const env = {
  clerk: {
    pk: import.meta.env.VITE_CLERK_PK,
    sk: import.meta.env.VITE_CLERK_SK,
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
};
