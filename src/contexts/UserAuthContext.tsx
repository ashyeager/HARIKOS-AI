import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { AuthUser } from '../types/auth';

interface UserAuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isAuthLoading: boolean;
  authError: string | null;
  signInWithGoogle: (nextPath?: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      if (!isSupabaseConfigured) {
        setAuthError('Authentication is not configured yet. Please contact HARIKOS.');
        setIsAuthLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.getSession();
      if (error) setAuthError(error.message);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsAuthLoading(false);
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthError(null);
      setIsAuthLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async (nextPath = '/dashboard') => {
    if (!isSupabaseConfigured) {
      throw new Error('Authentication is not configured yet. Please contact HARIKOS.');
    }
    setAuthError(null);
    const safeNextPath = nextPath.startsWith('/') ? nextPath : '/dashboard';
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNextPath)}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = useMemo(() => ({ user, session, isAuthLoading, authError, signInWithGoogle, logOut }), [user, session, isAuthLoading, authError]);

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
}
