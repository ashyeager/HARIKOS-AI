import { useEffect, useState } from 'react';
import { Chrome, LoaderCircle, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const location = useLocation();
  const { signInWithGoogle, authError } = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle(location.pathname === '/' ? '/dashboard' : location.pathname);
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'We could not start Google sign-in.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/80 px-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="w-full max-w-md rounded-3xl border border-brand-white/10 bg-[#050505]/95 p-6 shadow-2xl">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand-gray-500">Client Portal</p>
            <h3 id="auth-title" className="mt-2 text-xl font-semibold text-brand-white">Continue with HARIKOS</h3>
            <p className="mt-2 text-sm text-brand-gray-400">Secure access for HARIKOS clients and partners.</p>
          </div>
          <button onClick={onClose} disabled={isSubmitting} className="rounded-full border border-brand-white/10 p-2 text-brand-gray-400 transition hover:text-brand-white disabled:opacity-50" aria-label="Close sign in dialog">
            <X className="h-4 w-4" />
          </button>
        </div>

        {(error || authError) && <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">{error || authError}</div>}

        <button onClick={handleGoogleSignIn} disabled={isSubmitting} className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-white px-4 py-3.5 text-sm font-semibold text-brand-black transition hover:bg-brand-gray-300 disabled:cursor-not-allowed disabled:opacity-50">
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Chrome className="h-4 w-4" />}
          {isSubmitting ? 'Opening Google…' : 'Continue with Google'}
        </button>

        <p className="mt-5 text-center text-xs leading-5 text-brand-gray-500">By continuing, you agree to use HARIKOS AI’s secure client experience.</p>
      </div>
    </div>
  );
}
