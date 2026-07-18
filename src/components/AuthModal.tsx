import { useEffect, useMemo, useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup' | 'forgot';
  onModeChange: (mode: 'signin' | 'signup' | 'forgot') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setFullName('');
      setShowPassword(false);
      setMessage(null);
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const heading = useMemo(() => {
    if (mode === 'signup') return 'Create your account';
    if (mode === 'forgot') return 'Reset your password';
    return 'Welcome back';
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage('Check your inbox for a password reset link.');
        return;
      }

      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/profile`,
          },
        });
        if (error) throw error;
        if (data.session) {
          setMessage('Account created. You are signed in.');
        } else {
          setMessage('Account created. Please confirm your email if required.');
        }
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/profile` } });
      if (error) throw error;
      setMessage('A sign-in link has been sent to your inbox.');
    } catch (err: any) {
      setError(err?.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/80 backdrop-blur-md px-4">
      <div className="w-full max-w-md rounded-3xl border border-brand-white/10 bg-[#050505]/95 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-brand-white">{heading}</h3>
            <p className="text-sm text-brand-gray-400">Secure access for HARIKOS clients.</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-brand-white/10 p-2 text-brand-gray-400 hover:text-brand-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand-gray-500">Full Name</label>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] px-4 py-3">
                <User className="w-4 h-4 text-brand-gray-500" />
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full bg-transparent text-sm text-brand-white outline-none" placeholder="Your full name" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand-gray-500">Email</label>
            <div className="flex items-center gap-3 rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] px-4 py-3">
              <Mail className="w-4 h-4 text-brand-gray-500" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent text-sm text-brand-white outline-none" placeholder="you@example.com" />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand-gray-500">Password</label>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] px-4 py-3">
                <Lock className="w-4 h-4 text-brand-gray-500" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-transparent text-sm text-brand-white outline-none" placeholder="Create a strong password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-brand-gray-500">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {message && <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">{message}</div>}
          {error && <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">{error}</div>}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-brand-white px-4 py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-gray-300 disabled:opacity-50">
            {isSubmitting ? 'Please wait…' : mode === 'forgot' ? 'Send reset link' : mode === 'signup' ? 'Create account' : 'Send sign-in link'}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm text-brand-gray-400">
          {mode !== 'signin' && (
            <button onClick={() => onModeChange('signin')} className="hover:text-brand-white">Sign in</button>
          )}
          {mode !== 'signup' && (
            <button onClick={() => onModeChange('signup')} className="hover:text-brand-white">Create account</button>
          )}
          {mode !== 'forgot' && (
            <button onClick={() => onModeChange('forgot')} className="hover:text-brand-white">Forgot password</button>
          )}
        </div>
      </div>
    </div>
  );
}
