import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../services/api';

export default function ProtectedRoute({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthorized(false);
      setIsReady(true);
      return;
    }

    api.post('/auth/me')
      .then(() => {
        setIsAuthorized(true);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setIsAuthorized(false);
      })
      .finally(() => setIsReady(true));
  }, []);

  if (!isReady) return null;
  if (!isAuthorized) return <Navigate to="/admin/login" replace />;

  return children;
}
