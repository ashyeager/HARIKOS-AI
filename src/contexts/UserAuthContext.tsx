import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface UserAuthContextType {
  user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } | null;
  isAuthLoading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAuthContextType['user']>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser((data.session?.user ?? null) as UserAuthContextType['user']);
      setIsAuthLoading(false);
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user ?? null) as UserAuthContextType['user']);
      setIsAuthLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    try {
      await supabase.auth.signInWithOtp({ email: 'hello@harikos.ai' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const logOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <UserAuthContext.Provider value={{ user, isAuthLoading, signIn, logOut }}>
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
