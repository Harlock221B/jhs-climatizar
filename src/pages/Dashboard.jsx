import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  CalendarCheck, 
  Clock, 
  DollarSign, 
  Plus, 
  Users, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  BellRing,
  Snowflake,
  Send,
  FileText,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  subscribeClientes, 
  subscribeOrcamentos, 
  subscribeAgendamentos 
} from '../services/db';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadedCount = 0;
    const checkDone = () => {
      loadedCount++;
      if (loadedCount >= 3) setLoading(false);
    };

    const unsubC = subscribeClientes((data) => {
      setClientes(data);
      checkDone();
    }, () => checkDone());

    const unsubO = subscribeOrcamentos((data) => {
      setOrcamentos(data);
      checkDone();
    }, () => checkDone());

    const unsubA = subscribeAgendamentos((data) => {
      setAgendamentos(data);
      checkDone();
    }, () => checkDone());

    return () => {
      unsubC();
      unsubO();
      unsubA();
    };
  }, []);

  // Cálculos Reais
  const faturamentoTotal = orcamentos
    .filter(o => o.status === 'Aprovado')
    .reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0);

  const orcamentosPendentes = orcamentos.filter(o => o.status === 'Enviado' || o.status === 'Pendente').length;
  const taxaConversao = orcamentos.length > 0 
    ? Math.round((orcamentos.filter(o => o.status === 'Aprovado').length / orcamentos.length) * 100) 
    : 0;

  // Lógica de Recorrência Preventiva (Ciclo de 6 meses)
  const getRecorrenciaStatus = (cliente) => {
    let dataReferencia = cliente.dataUltimoServico;
    if (!dataReferencia && cliente.createdAt?.toDate) {
      dataReferencia = cliente.createdAt.toDate().toISOString().split('T')[0];
    }
    if (!dataReferencia) return false;
    const diffTime = Math.abs(new Date() - new Date(dataReferencia));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 150; // Alerta aos 5 meses ou vencido aos 6 meses
  };

  const clientesParaHigienizacao = clientes.filter(getRecorrenciaStatus);

  // Saudação Dinâmica e Orgânica baseada no Horário
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: 'Bom dia', emoji: '☀️', subtitle: 'Pronto para os atendimentos e instalações de hoje?' };
    if (hour >= 12 && hour < 18) return { text: 'Boa tarde', emoji: '🌤️', subtitle: 'Acompanhe seus orçamentos e compromissos em andamento.' };
    return { text: 'Boa noite', emoji: '🌙', subtitle: 'Resumo operacional e fechamento do dia.' };
  };
  const greeting = getGreeting();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      
      {/* ======================================================== */}
      {/* HERO CARD DE BOAS-VINDAS ORGÂNICO                        */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-blue-50/60 p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{greeting.emoji}</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              {greeting.text}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Olá, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{currentUser?.email?.split('@')[0] || 'Equipe JHS'}</span>!
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            {greeting.subtitle}
          </p>
        </div>

        {/* Botão de Ação Rápida no Hero */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link 
            to="/dashboard/orcamentos"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-5 rounded-2xl shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:scale-95 text-xs sm:text-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Novo Orçamento
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DOCK DE AÇÕES RÁPIDAS (MOBILE & TABLET)                  */}
      {/* ======================================================== */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <Link 
          to="/dashboard/orcamentos"
          className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group active:scale-95"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block">Criar Orçamento</span>
        </Link>

        <Link 
          to="/dashboard/calendario"
          className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group active:scale-95"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block">Ver Agenda</span>
        </Link>

        <Link 
          to="/dashboard/clientes"
          className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group active:scale-95"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block">Clientes & Pós</span>
        </Link>
      </div>

      {/* ======================================================== */}
      {/* ALERTA PROATIVO DE RECORRÊNCIA (6 MESES)                 */}
      {/* ======================================================== */}
      {!loading && clientesParaHigienizacao.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 text-white shadow-xl shadow-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-amber-400/30 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <BellRing className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                  Oportunidade de Receita
                </span>
                <span className="text-[11px] text-amber-100 font-semibold">Ciclo de 6 Meses</span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base mt-0.5">
                {clientesParaHigienizacao.length} {clientesParaHigienizacao.length === 1 ? 'cliente completou' : 'clientes completaram'} 6 meses de serviço!
              </h3>
              <p className="text-amber-100 text-xs mt-0.5">
                Momento ideal para oferecer a higienização preventiva periódica via WhatsApp.
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/clientes?filtro=recorrencia"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-orange-700 hover:bg-amber-50 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shrink-0 whitespace-nowrap group hover:scale-[1.02] active:scale-95"
          >
            <span>Ver e Enviar WhatsApp</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
          <p className="text-xs font-semibold">Sincronizando dados em tempo real...</p>
        </div>
      ) : (
        <>
          {/* ======================================================== */}
          {/* CARDS DE MÉTRICAS EM GRADE MOBILE (2x2 NO CELULAR)       */}
          {/* ======================================================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            
            {/* Faturamento */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Aprovados
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Faturamento</p>
                <p className="text-lg sm:text-2xl font-black text-slate-800 mt-0.5 truncate">
                  R$ {faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Clientes */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Ativos
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Clientes</p>
                <p className="text-lg sm:text-2xl font-black text-slate-800 mt-0.5">
                  {clientes.length}
                </p>
              </div>
            </div>

            {/* Pendentes */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  Aberto
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Orçamentos</p>
                <p className="text-lg sm:text-2xl font-black text-slate-800 mt-0.5">
                  {orcamentosPendentes}
                </p>
              </div>
            </div>

            {/* Taxa de Conversão */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  Taxa
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Conversão</p>
                <p className="text-lg sm:text-2xl font-black text-slate-800 mt-0.5">
                  {taxaConversao}%
                </p>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* PRÓXIMOS SERVIÇOS & ORÇAMENTOS RECENTES                  */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Próximos Agendamentos */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xs p-5 sm:p-6 flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800">Próximos Serviços na Agenda</h3>
                  <p className="text-[11px] text-slate-400">Compromissos sincronizados em tempo real</p>
                </div>
                <Link to="/dashboard/calendario" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  Ver Agenda <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              
              {agendamentos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400 flex-1 text-center">
                  <Calendar className="w-9 h-9 mb-2 opacity-40 text-blue-500" />
                  <p className="font-semibold text-xs text-slate-600">Nenhum atendimento agendado ainda.</p>
                  <Link to="/dashboard/calendario" className="mt-2 text-xs text-blue-600 font-bold hover:underline">
                    + Agendar agora
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {agendamentos.slice(0, 4).map((agendamento) => (
                    <div key={agendamento.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-slate-100 hover:bg-slate-50/80 transition-all gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-black shrink-0 border border-blue-100">
                          <span className="text-xs">{agendamento.hora || '09:00'}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">{agendamento.cliente}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{agendamento.servico}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{agendamento.data} • {agendamento.endereco || 'Sem endereço'}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          agendamento.status === 'confirmado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {agendamento.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Orçamentos Recentes */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-5 sm:p-6 flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800">Últimos Orçamentos</h3>
                  <p className="text-[11px] text-slate-400">Propostas comerciais</p>
                </div>
                <Link to="/dashboard/orcamentos" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  Ver Todos <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {orcamentos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400 flex-1 text-center">
                  <Clock className="w-9 h-9 mb-2 opacity-40 text-blue-500" />
                  <p className="font-semibold text-xs text-slate-600">Nenhum orçamento cadastrado.</p>
                  <Link to="/dashboard/orcamentos" className="mt-2 text-xs text-blue-600 font-bold hover:underline">
                    + Criar proposta
                  </Link>
                </div>
              ) : (
                <div className="space-y-3.5 flex-1">
                  {orcamentos.slice(0, 5).map((orc) => (
                    <div key={orc.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">{orc.cliente}</h4>
                        <p className="text-[11px] text-slate-500 truncate max-w-[130px] sm:max-w-[160px]">{orc.servico}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-xs sm:text-sm text-slate-900">
                          R$ {Number(orc.valor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                          orc.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {orc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </>
      )}

    </div>
  );
}
