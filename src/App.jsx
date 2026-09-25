import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { WallboxSection } from './components/WallboxSection';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Calendario from './pages/Calendario';
import Orcamentos from './pages/Orcamentos';
import Clientes from './pages/Clientes';

// Layouts
import AdminLayout from './layouts/AdminLayout';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota Pública (Site Oficial) */}
          <Route path="/" element={<Home />} />
          <Route path="/wallbox" element={<WallboxSection />} />
          
          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas (Painel Admin) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="orcamentos" element={<Orcamentos />} />
            <Route path="clientes" element={<Clientes />} />
            
            {/* Fallback temporário para páginas não implementadas */}
            <Route path="*" element={<div className="flex h-full items-center justify-center text-slate-500 font-medium">Módulo em desenvolvimento...</div>} />
          </Route>

          {/* Fallback para URLs não encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}