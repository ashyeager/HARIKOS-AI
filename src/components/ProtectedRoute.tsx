import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAuthLoading } = useUserAuth();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen px-6 py-32 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-white/20 border-t-brand-white" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace state={{ authModal: 'signin' }} />;
  }

  return <>{children}</>;
}
