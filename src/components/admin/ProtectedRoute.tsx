import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, ReactNode } from 'react';
import { authUtils } from '@/lib/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const location = useLocation();
  const isAuthenticated = authUtils.isAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('redirectPath', location.pathname);
    }
  }, [location.pathname, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};
