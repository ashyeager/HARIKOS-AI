import { Link } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

export default function Dashboard() {
  const { user, isAuthLoading } = useUserAuth();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-white/20 border-t-brand-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-3xl font-display text-brand-white">Access required</h1>
          <p className="mt-3 text-brand-gray-400">Please sign in to view your dashboard.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-brand-white px-5 py-3 text-sm font-semibold text-brand-black">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl rounded-3xl border border-brand-white/10 bg-brand-white/[0.03] p-8 shadow-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand-gray-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-display text-brand-white">Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0] || 'there'}.</h1>
            <p className="mt-3 max-w-2xl text-brand-gray-400">Here you can manage your project requests and keep your HARIKOS client experience streamlined.</p>
          </div>
          <Link to="/#contact" className="inline-flex items-center justify-center rounded-full bg-brand-white px-5 py-3 text-sm font-semibold text-brand-black">Start a Project</Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-brand-white/10 bg-brand-black/50 p-6">
            <h2 className="text-lg font-semibold text-brand-white">Profile completion</h2>
            <div className="mt-4 h-2 rounded-full bg-brand-white/10">
              <div className="h-2 w-3/4 rounded-full bg-cyan-400" />
            </div>
            <p className="mt-3 text-sm text-brand-gray-400">Add your full profile details and project goals to unlock a more tailored HARIKOS experience.</p>
          </div>
          <div className="rounded-3xl border border-brand-white/10 bg-brand-black/50 p-6">
            <h2 className="text-lg font-semibold text-brand-white">Account</h2>
            <div className="mt-4 space-y-2 text-sm text-brand-gray-400">
              <p><span className="text-brand-white">Email:</span> {user.email}</p>
              <p><span className="text-brand-white">Status:</span> Active</p>
            </div>
            <Link to="/profile" className="mt-6 inline-flex text-sm font-medium text-cyan-400">View profile →</Link>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-brand-white/10 bg-brand-black/50 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-brand-white">Recent project requests</h2>
            <Link to="/#contact" className="text-sm font-medium text-brand-gray-400 hover:text-brand-white">Create new</Link>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-brand-white/10 p-10 text-center text-sm text-brand-gray-500">
            No project requests yet.
          </div>
        </div>
      </div>
    </div>
  );
}
