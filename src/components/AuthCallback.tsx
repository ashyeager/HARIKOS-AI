import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const finishSignIn = async () => {
      const { error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        if (isMounted) setError(sessionError.message);
        return;
      }
      const next = searchParams.get('next');
      navigate(next?.startsWith('/') ? next : '/dashboard', { replace: true });
    };
    finishSignIn();
    return () => { isMounted = false; };
  }, [navigate, searchParams]);

  return (
    <main className="min-h-screen px-6 py-32 flex items-center justify-center">
      <div className="text-center">
        {error ? <><h1 className="text-2xl font-display text-brand-white">Sign-in could not be completed</h1><p className="mt-3 text-brand-gray-400">{error}</p></> : <><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-white/20 border-t-brand-white" /><p className="mt-5 text-sm text-brand-gray-400">Securing your HARIKOS session…</p></>}
      </div>
    </main>
  );
}
