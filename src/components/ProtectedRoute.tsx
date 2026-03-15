import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F04E23]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/a/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
