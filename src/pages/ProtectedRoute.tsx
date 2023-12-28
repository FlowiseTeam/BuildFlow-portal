import { useAuth } from '@src/features/auth/AuthProvider';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authenticated } = useAuth();

  if (authenticated === undefined) {
    // return null;
  }

  if (!authenticated) {
    // return <Navigate to="/login" relative="path" />;
  }

  return <>{children}</>;
}
