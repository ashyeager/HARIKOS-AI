import { Link } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';
import { Shield, Bell, Palette, Lock, UserCircle } from 'lucide-react';

export default function Settings() {
  const { user, isAuthLoading } = useUserAuth();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen px-6 py-32 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-white/20 border-t-brand-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen px-6 py-32 text-center">
        <h1 className="text-3xl font-display text-brand-white">Access required</h1>
        <p className="mt-3 text-brand-gray-400">Please sign in to manage your settings.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-brand-white px-5 py-3 text-sm font-semibold text-brand-black">Back home</Link>
      </div>
    );
  }

  const sections = [
    { title: 'Profile', description: 'Manage your client profile information.', icon: UserCircle },
    { title: 'Security', description: 'Review your account security preferences.', icon: Lock },
    { title: 'Notifications', description: 'Manage how you receive project updates.', icon: Bell },
    { title: 'Theme', description: 'Switch between available interface themes.', icon: Palette },
    { title: 'Privacy', description: 'Control how your details are shared.', icon: Shield },
  ];

  return (
    <div className="min-h-screen px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl rounded-3xl border border-brand-white/10 bg-brand-white/[0.03] p-8 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand-gray-500">Settings</p>
            <h1 className="mt-2 text-3xl font-display text-brand-white">Manage your client experience</h1>
            <p className="mt-3 max-w-2xl text-brand-gray-400">Keep your account details and communication preferences aligned with your HARIKOS projects.</p>
          </div>
          <Link to="/dashboard" className="inline-flex rounded-full border border-brand-white/10 px-5 py-3 text-sm font-semibold text-brand-white">Back to dashboard</Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="rounded-3xl border border-brand-white/10 bg-brand-black/50 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-brand-white/10 bg-brand-white/5 p-2">
                    <Icon className="h-5 w-5 text-brand-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-brand-white">{section.title}</h2>
                    <p className="mt-1 text-sm text-brand-gray-400">{section.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
