import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const stubClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    signInWithOtp: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    resetPasswordForEmail: async () => ({ data: {}, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
  from: () => ({
    insert: async () => ({ data: null, error: null }),
    select: async () => ({ data: [], error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
  }),
};

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : (stubClient as any);
