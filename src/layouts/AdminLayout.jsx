import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  Users, 
  LogOut,
  Snowflake,
  Menu,
  X,
  ExternalLink,
  Shield,
  Sparkles,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Início' },
    { path: '/dashboard/calendario', icon: <CalendarDays className="w-5 h-5" />, label: 'Agenda' },
    { path: '/dashboard/orcamentos', icon: <FileText className="w-5 h-5" />, label: 'Orçamentos' },
    { path: '/dashboard/clientes', icon: <Users className="w-5 h-5" />, label: 'Clientes' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  const userInitial = currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'J';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/20 flex flex-col md:flex-row antialiased selection:bg-blue-500 selection:text-white">
      
      {/* ======================================================== */}
      {/* CABEÇALHO MOBILE (COMPACTO & ORGÂNICO)                   */}
      {/* ======================================================== */}
      <header className="md:hidden bg-slate-900/95 backdrop-blur-md text-white p-3.5 px-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-xl shadow-md shadow-blue-500/20">
            <Snowflake className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-black text-base tracking-tight leading-tight block">JHS Climatizar</span>
            <span className="text-[10px] text-blue-400 font-semibold block -mt-0.5">Painel Operacional</span>
          </div>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white p-1.5 pl-2.5 rounded-full border border-slate-700/80 transition-all text-xs font-bold"
        >
          <span className="text-[11px] text-slate-300 truncate max-w-[80px]">
            {currentUser?.email?.split('@')[0]}
          </span>
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold">
            {userInitial}
          </div>
        </button>
      </header>

      {/* ======================================================== */}
      {/* GAVETA / BOTTOM SHEET MOBILE (PERFIL E CONFIGURAÇÕES)     */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div 
            className="bg-slate-900 rounded-t-3xl border-t border-slate-800 p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-600/30">
                  {userInitial}
                </div>
                <div>
                  <p className="text-sm font-bold text-white truncate max-w-[200px]">{currentUser?.email}</p>
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    Firebase Conectado
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <a 
                href="/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-bold">Ver Site Público</p>
                    <p className="text-xs text-slate-400">Página inicial da JHS Climatizar</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <button 
                onClick={handleLogout} 
                className="flex items-center justify-between w-full p-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-sm font-bold">Desconectar Conta</p>
                    <p className="text-xs text-red-400/80">Encerrar sessão de trabalho</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-500/60" />
              </button>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-500">
              JHS Climatizar • Versão Mobile 2.0
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR ELEGANTE                                 */}
      {/* ======================================================== */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col hidden md:flex sticky top-0 h-screen shrink-0 border-r border-slate-800/90 shadow-xl">
        <div className="p-6 pb-4 flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
            <Snowflake className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white leading-tight tracking-tight">JHS Climatizar</h2>
            <p className="text-xs text-blue-400 font-semibold">Painel Operacional</p>
          </div>
        </div>

        {/* User Badge in Sidebar */}
        <div className="mx-4 my-4 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-md">
            {userInitial}
          </div>
          <div className="overflow-hidden min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate" title={currentUser?.email || ''}>
              {currentUser?.email || 'Profissional'}
            </p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Firebase Conectado
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-bold translate-x-1' 
                    : 'hover:bg-white/5 hover:text-white font-medium text-slate-400'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <Link 
              to="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors text-xs font-semibold"
            >
              <ExternalLink className="w-4 h-4 text-slate-500" />
              <span>Ver Site Público</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800/80 mt-auto">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors font-medium text-sm"
          >
            <LogOut className="w-5 h-5 text-slate-400" />
            <span>Sair do sistema</span>
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* ÁREA DE CONTEÚDO PRINCIPAL                               */}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Desktop Topbar */}
        <header className="hidden md:flex bg-white/80 backdrop-blur-md border-b border-slate-200/80 h-20 items-center justify-between px-8 lg:px-12 shrink-0 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-800">
              {menuItems.find(i => i.path === location.pathname)?.label || 'Painel'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" /> Online
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100/70 border border-slate-200/80 py-1.5 px-3.5 rounded-full">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {userInitial}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser?.email || 'Administrador'}
                </p>
                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-500 inline" />
                  Conta Verificada
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content (Com padding extra na base para o dock mobile) */}
        <div className="p-4 sm:p-6 lg:p-10 flex-1 overflow-y-auto pb-28 md:pb-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>

      {/* ======================================================== */}
      {/* DOCK BAR MOBILE FIXO INFERIOR (EXPERIÊNCIA DE APLICATIVO) */}
      {/* ======================================================== */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-1.5 shadow-2xl flex items-center justify-around">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3.5 rounded-2xl transition-all relative ${
                isActive 
                  ? 'text-white font-bold bg-blue-600 shadow-lg shadow-blue-600/30 -translate-y-0.5' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5 font-semibold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
        
        {/* Perfil & Menu */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-2 px-3.5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
            {userInitial}
          </div>
          <span className="text-[10px] mt-0.5 font-semibold tracking-tight">Perfil</span>
        </button>
      </nav>

    </div>
  );
}
