import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Snowflake } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4 text-white">
        <div className="bg-blue-600 p-4 rounded-2xl animate-spin">
          <Snowflake className="w-8 h-8 text-white" />
        </div>
        <p className="text-slate-400 font-medium">Verificando autenticação...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

