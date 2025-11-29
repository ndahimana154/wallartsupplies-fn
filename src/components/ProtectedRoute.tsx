import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

type Props = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();

  const token = auth.getToken();
  const expired = auth.isExpired();

  if (!token || expired) {
    try {
      auth.clearAuth();
    } catch (e) {}
    return <Navigate to="/a/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
