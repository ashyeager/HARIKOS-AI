import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthUser } from '../types/auth';

interface UserAuthContextType {
  user: AuthUser | null;
  isAuthLoading: boolean;
  signIn: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser((data.session?.user ?? null) as AuthUser | null);
      setIsAuthLoading(false);
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user ?? null) as AuthUser | null);
      setIsAuthLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    // UI entry point handled by modal; placeholder for compatibility.
    return;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
  };

  const resetPassword = async (email: string) => {
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
  };

  const logOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <UserAuthContext.Provider value={{ user, isAuthLoading, signIn, signUp, resetPassword, logOut }}>
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
