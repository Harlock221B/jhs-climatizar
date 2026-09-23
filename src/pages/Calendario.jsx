import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  User, 
  Wrench,
  Check,
  Plus,
  Trash2,
  X,
  Loader2,
  CalendarDays,
  Columns3,
  CalendarRange
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { 
  format, 
  addDays, 
  subDays, 
  addWeeks, 
  subWeeks, 
  addMonths, 
  subMonths, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  startOfMonth, 
  endOfMonth, 
  isSameDay, 
  isSameMonth, 
  isToday 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { subscribeAgendamentos, addAgendamento, updateAgendamentoStatus, deleteAgendamento, subscribeClientes, addCliente } from '../services/db';
import { generateGoogleCalendarLink } from '../utils/googleCalendar';

export default function Calendario() {
  const [searchParams] = useSearchParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('semana'); // 'dia' | 'semana' | 'mes'
  const [agendamentos, setAgendamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newClientModalOpen, setNewClientModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingClient, setSavingClient] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    cliente: '',
    telefone: '',
    servico: 'Instalação de Ar-Condicionado',
    endereco: '',
    data: new Date().toISOString().split('T')[0],
    hora: '09:00',
    status: 'confirmado'
  });
  const [newClientData, setNewClientData] = useState({ nome: '', telefone: '', email: '', endereco: '' });

  useEffect(() => {
    const unsubscribeAg = subscribeAgendamentos((data) => {
      setAgendamentos(data);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    const unsubscribeCli = subscribeClientes((data) => {
      setClientes(data);
    }, (err) => console.error("Erro ao carregar clientes", err));

    return () => {
      unsubscribeAg();
      unsubscribeCli();
    };
  }, []);

  useEffect(() => {
    const clienteId = searchParams.get('clienteId');
    if (clienteId && clientes.length > 0) {
      const cliente = clientes.find(c => c.id === clienteId);
      if (cliente) {
        setFormData(prev => ({
          ...prev,
          cliente: cliente.nome,
          telefone: cliente.telefone || '',
          endereco: cliente.endereco || ''
        }));
        setModalOpen(true);
      }
    }
  }, [searchParams, clientes]);

  const handleClientSelect = (e) => {
    const clienteId = e.target.value;
    if (clienteId === 'NEW') {
      setNewClientModalOpen(true);
      return;
    }
    
    if (clienteId) {
      const cliente = clientes.find(c => c.id === clienteId);
      if (cliente) {
        setFormData(prev => ({
          ...prev,
          cliente: cliente.nome,
          telefone: cliente.telefone || '',
          endereco: cliente.endereco || ''
        }));
      }
    } else {
       setFormData(prev => ({
          ...prev,
          cliente: '',
          telefone: '',
          endereco: ''
        }));
    }
  };

  const handleSaveNewClient = async (e) => {
    e.preventDefault();
    if (!newClientData.nome.trim()) return;
    setSavingClient(true);
    try {
      const docRef = await addCliente({
        ...newClientData,
        totalServicos: 1,
        aparelho: 'Não informado',
        dataUltimoServico: new Date().toISOString().split('T')[0]
      });
      
      setFormData(prev => ({
        ...prev,
        cliente: newClientData.nome,
        telefone: newClientData.telefone || '',
        endereco: newClientData.endereco || ''
      }));

      setNewClientModalOpen(false);
      setNewClientData({ nome: '', telefone: '', email: '', endereco: '' });
    } catch (err) {
      alert("Erro ao criar cliente");
    } finally {
      setSavingClient(false);
    }
  };

  // Navegação do Calendário baseado no Modo Atual
  const handlePrev = () => {
    if (viewMode === 'dia') setCurrentDate(prev => subDays(prev, 1));
    else if (viewMode === 'semana') setCurrentDate(prev => subWeeks(prev, 1));
    else if (viewMode === 'mes') setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNext = () => {
    if (viewMode === 'dia') setCurrentDate(prev => addDays(prev, 1));
    else if (viewMode === 'semana') setCurrentDate(prev => addWeeks(prev, 1));
    else if (viewMode === 'mes') setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddAgendamento = async (e) => {
    e.preventDefault();
    if (!formData.cliente.trim()) return;

    setSaving(true);
    try {
      await addAgendamento(formData);
      setFormData({
        cliente: '',
        servico: 'Instalação de Ar-Condicionado',
        endereco: '',
        data: format(currentDate, 'yyyy-MM-dd'),
        hora: '09:00',
        status: 'confirmado'
      });
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      alert("Erro ao salvar no Firestore.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'confirmado' ? 'pendente' : 'confirmado';
    try {
      await updateAgendamentoStatus(id, nextStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remover este compromisso da agenda?")) {
      try {
        await deleteAgendamento(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openNewForDateAndHour = (dateStr, hourStr = '09:00') => {
    setFormData(prev => ({
      ...prev,
      data: dateStr,
      hora: hourStr
    }));
    setModalOpen(true);
  };

  // Horários das 07:00 às 19:00 para o modo Dia
  const hoursList = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  // Cálculos para modo Semana
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Cálculos para modo Mês
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthGridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const monthGridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const monthDays = eachDayOfInterval({ start: monthGridStart, end: monthGridEnd });

  // Título do Período
  const getHeaderTitle = () => {
    if (viewMode === 'dia') {
      return format(currentDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
    if (viewMode === 'semana') {
      return `Semana: ${format(weekStart, "dd 'de' MMM", { locale: ptBR })} a ${format(weekEnd, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}`;
    }
    return format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Agenda & Calendário</h1>
          <p className="text-slate-500 text-sm">Gerencie os atendimentos com visão por Dia, Semana ou Mês.</p>
        </div>

        <button 
          onClick={() => openNewForDateAndHour(format(currentDate, 'yyyy-MM-dd'))}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 text-sm"
        >
          <Plus className="w-4 h-4" /> Novo Agendamento
        </button>
      </div>

      {/* Barra de Controles: Navegação e Seletores de Modo */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Navegação de Datas */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handlePrev} 
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleToday} 
              className="px-3.5 py-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Hoje
            </button>
            <button 
              onClick={handleNext} 
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
              title="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-base font-extrabold text-slate-800 capitalize">
            {getHeaderTitle()}
          </h2>
        </div>

        {/* Alternador de Modos: Dia | Semana | Mês */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full md:w-auto justify-center">
          <button 
            onClick={() => setViewMode('dia')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'dia' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Dia
          </button>
          <button 
            onClick={() => setViewMode('semana')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'semana' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Columns3 className="w-3.5 h-3.5" />
            Semanal
          </button>
          <button 
            onClick={() => setViewMode('mes')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'mes' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarRange className="w-3.5 h-3.5" />
            Mês
          </button>
        </div>
      </div>

      {/* Conteúdo Principal do Calendário */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex-1 p-6 overflow-y-auto">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
            <p>Carregando agenda...</p>
          </div>
        ) : (
          <>
            {/* ======================================================== */}
            {/* 1. MODO DIA: Grade com horários detalhados               */}
            {/* ======================================================== */}
            {viewMode === 'dia' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Horário</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compromisso / Atendimento</span>
                </div>

                <div className="space-y-3">
                  {hoursList.map((hour) => {
                    const selectedDateStr = format(currentDate, 'yyyy-MM-dd');
                    // Agendamentos deste horário no dia atual
                    const matches = agendamentos.filter(a => a.data === selectedDateStr && a.hora?.startsWith(hour.slice(0, 2)));

                    return (
                      <div key={hour} className="flex gap-4 items-start group min-h-[64px] border-b border-slate-50 pb-3">
                        <div className="w-16 font-bold text-slate-400 text-sm pt-1 shrink-0 group-hover:text-blue-600 transition-colors">
                          {hour}
                        </div>

                        <div className="flex-1">
                          {matches.length > 0 ? (
                            <div className="space-y-2">
                              {matches.map(app => (
                                <div key={app.id} className="p-4 rounded-xl border border-blue-100 bg-blue-50/60 hover:bg-blue-50 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-blue-600" />
                                      <h4 className="font-bold text-slate-900 text-sm">{app.cliente}</h4>
                                      <span className="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                                        {app.hora}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                                      <Wrench className="w-3.5 h-3.5 text-slate-400" />
                                      <span>{app.servico}</span>
                                    </p>
                                    {app.endereco && (
                                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{app.endereco}</span>
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap mt-2 sm:mt-0">
                                    <a
                                      href={generateGoogleCalendarLink(app)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1 rounded-lg text-xs font-bold border bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transition-colors flex items-center gap-1"
                                      title="Adicionar ao Google Agenda"
                                    >
                                      <CalendarIcon className="w-3.5 h-3.5" /> Google Agenda
                                    </a>
                                    <button 
                                      onClick={() => handleToggleStatus(app.id, app.status)}
                                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                                        app.status === 'confirmado' 
                                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                                          : 'bg-amber-100 text-amber-800 border-amber-200'
                                      }`}
                                    >
                                      {app.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(app.id)}
                                      className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Remover"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <button 
                              onClick={() => openNewForDateAndHour(selectedDateStr, hour)}
                              className="w-full h-10 border border-dashed border-slate-200 rounded-xl text-xs font-medium text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/30 flex items-center justify-center gap-1 transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Horário livre • Agendar às {hour}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* 2. MODO SEMANAL: 7 Colunas de Seg a Dom com Horários     */}
            {/* ======================================================== */}
            {viewMode === 'semana' && (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {weekDays.map((day) => {
                  const dayStr = format(day, 'yyyy-MM-dd');
                  const isDayToday = isToday(day);
                  const isDaySelected = isSameDay(day, currentDate);
                  const dayAppointments = agendamentos.filter(a => a.data === dayStr);

                  return (
                    <div 
                      key={dayStr}
                      className={`flex flex-col rounded-2xl border transition-all min-h-[380px] p-3 ${
                        isDayToday 
                          ? 'border-blue-300 bg-blue-50/20' 
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {/* Cabeçalho do Dia */}
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                        <div>
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            {format(day, 'EEE', { locale: ptBR })}
                          </p>
                          <p className={`text-lg font-extrabold leading-tight ${isDayToday ? 'text-blue-600' : 'text-slate-800'}`}>
                            {format(day, 'dd')}
                          </p>
                        </div>
                        {isDayToday && (
                          <span className="text-[9px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                            Hoje
                          </span>
                        )}
                      </div>

                      {/* Lista de Serviços do Dia */}
                      <div className="space-y-2 flex-1 overflow-y-auto">
                        {dayAppointments.length === 0 ? (
                          <div className="h-28 flex flex-col items-center justify-center text-slate-300 text-xs text-center p-2">
                            <span>Livre</span>
                          </div>
                        ) : (
                          dayAppointments.map(app => (
                            <div 
                              key={app.id} 
                              className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-white transition-all shadow-sm group relative"
                            >
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-extrabold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                                  {app.hora}
                                </span>
                                <button 
                                  onClick={() => handleDelete(app.id)}
                                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="font-bold text-slate-800 text-xs truncate" title={app.cliente}>
                                {app.cliente}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate" title={app.servico}>
                                {app.servico}
                              </p>
                              {app.endereco && (
                                <p className="text-[10px] text-slate-400 truncate mt-0.5" title={app.endereco}>
                                  {app.endereco}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Botão rápido para adicionar neste dia */}
                      <button 
                        onClick={() => openNewForDateAndHour(dayStr, '09:00')}
                        className="mt-2 w-full py-1.5 border border-dashed border-slate-200 hover:border-blue-300 text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Adicionar
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ======================================================== */}
            {/* 3. MODO MÊS: Grade Completa Mensal                       */}
            {/* ======================================================== */}
            {viewMode === 'mes' && (
              <div>
                <div className="overflow-x-auto pb-2">
                  <div className="min-w-[620px] md:min-w-0">
                    {/* Dias da Semana (Dom a Sáb) */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 mb-2">
                      <span>Dom</span>
                      <span>Seg</span>
                      <span>Ter</span>
                      <span>Qua</span>
                      <span>Qui</span>
                      <span>Sex</span>
                      <span>Sáb</span>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {monthDays.map((day) => {
                        const dayStr = format(day, 'yyyy-MM-dd');
                        const isDayCurrentMonth = isSameMonth(day, currentDate);
                        const isDayToday = isToday(day);
                        const isDaySelected = isSameDay(day, currentDate);
                        const dayApps = agendamentos.filter(a => a.data === dayStr);

                        return (
                          <div 
                            key={dayStr}
                            onClick={() => setCurrentDate(day)}
                            className={`min-h-[95px] p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                              isDaySelected
                                ? 'border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                                : !isDayCurrentMonth 
                                ? 'bg-slate-50/40 border-slate-100 text-slate-300 opacity-60' 
                                : isDayToday
                                ? 'border-blue-300 bg-blue-50/20 text-slate-900'
                                : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-xs'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className={`text-xs font-bold ${isDayToday ? 'text-blue-600 font-extrabold' : isDaySelected ? 'text-blue-700 font-black' : ''}`}>
                                {format(day, 'd')}
                              </span>
                              {dayApps.length > 0 && (
                                <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded-full">
                                  {dayApps.length}
                                </span>
                              )}
                            </div>

                            {/* Mini Cards no Dia do Mês */}
                            <div className="space-y-1 my-1 overflow-hidden">
                              {dayApps.slice(0, 2).map(app => (
                                <div key={app.id} className="text-[10px] truncate bg-blue-100/70 text-blue-900 font-semibold px-1 py-0.5 rounded-md">
                                  <span className="font-extrabold mr-1">{app.hora}</span>
                                  {app.cliente}
                                </div>
                              ))}
                              {dayApps.length > 2 && (
                                <p className="text-[9px] text-slate-400 font-medium">
                                  +{dayApps.length - 2} mais
                                </p>
                              )}
                            </div>

                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openNewForDateAndHour(dayStr, '09:00');
                              }}
                              className="opacity-0 hover:opacity-100 group-hover:opacity-100 text-[10px] text-blue-600 font-bold hover:underline text-left mt-auto"
                            >
                              + Agendar
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Lista de Compromissos do Dia Selecionado (Perfeito para Mobile) */}
                <div className="mt-6 pt-5 border-t border-slate-200/80">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Atendimentos em {format(currentDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                      </h4>
                      <p className="text-[11px] text-slate-400">Clique em qualquer dia do mês acima para ver os detalhes</p>
                    </div>
                    <button
                      onClick={() => openNewForDateAndHour(format(currentDate, 'yyyy-MM-dd'))}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> + Agendar neste dia
                    </button>
                  </div>

                  {(() => {
                    const selectedDayStr = format(currentDate, 'yyyy-MM-dd');
                    const selectedDayApps = agendamentos.filter(a => a.data === selectedDayStr);

                    if (selectedDayApps.length === 0) {
                      return (
                        <div className="py-6 px-4 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-400">
                          Nenhum atendimento agendado para este dia.
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedDayApps.map(app => (
                          <div key={app.id} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 shadow-xs flex flex-col justify-between gap-3">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="font-black text-xs text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                                  {app.hora}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  app.status === 'confirmado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {app.status}
                                </span>
                              </div>
                              <h5 className="font-extrabold text-slate-900 text-sm">{app.cliente}</h5>
                              <p className="text-xs text-slate-600 mt-0.5">{app.servico}</p>
                              {app.endereco && (
                                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  <span>{app.endereco}</span>
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 flex-wrap">
                              <a
                                href={generateGoogleCalendarLink(app)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                              >
                                <CalendarIcon className="w-3 h-3" /> Agenda
                              </a>
                              <button 
                                onClick={() => handleToggleStatus(app.id, app.status)}
                                className="text-[10px] font-bold text-slate-600 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                              >
                                Alternar Status
                              </button>
                              <button 
                                onClick={() => handleDelete(app.id)}
                                className="text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Novo Agendamento */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Novo Agendamento</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAgendamento} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Nome do Cliente *</label>
                <select 
                  required
                  value={clientes.find(c => c.nome === formData.cliente)?.id || (formData.cliente ? formData.cliente : '')}
                  onChange={handleClientSelect}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white"
                >
                  <option value="" disabled>Selecione um cliente...</option>
                  <option value="NEW" className="font-bold text-blue-600 bg-blue-50">+ Cadastrar Novo Cliente</option>
                  {clientes.map(cli => (
                    <option key={cli.id} value={cli.id}>{cli.nome}</option>
                  ))}
                </select>
                {formData.cliente && !clientes.find(c => c.nome === formData.cliente) && (
                  <p className="text-xs text-amber-600 mt-1">Cliente manual mantido: {formData.cliente}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Serviço a realizar</label>
                <input 
                  type="text"
                  required
                  value={formData.servico}
                  onChange={(e) => setFormData({...formData, servico: e.target.value})}
                  placeholder="Ex: Manutenção Preventiva + Limpeza"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Data</label>
                  <input 
                    type="date" 
                    required
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Horário</label>
                  <input 
                    type="time" 
                    required
                    value={formData.hora}
                    onChange={(e) => setFormData({...formData, hora: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Endereço do Local</label>
                <input 
                  type="text" 
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  placeholder="Rua, Número, Bairro ou Condomínio"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md disabled:bg-blue-400 text-sm"
                >
                  {saving ? 'Agendando...' : 'Salvar no Firebase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Quick Add Cliente */}
      {newClientModalOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Cadastrar Novo Cliente</h3>
              <button onClick={() => setNewClientModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveNewClient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nome Completo *</label>
                <input 
                  type="text" required
                  value={newClientData.nome}
                  onChange={e => setNewClientData({...newClientData, nome: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Telefone (WhatsApp)</label>
                <input 
                  type="text" 
                  value={newClientData.telefone}
                  onChange={e => setNewClientData({...newClientData, telefone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Endereço Principal</label>
                <input 
                  type="text" 
                  value={newClientData.endereco}
                  onChange={e => setNewClientData({...newClientData, endereco: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setNewClientModalOpen(false)}
                  className="px-4 py-2 border text-slate-600 rounded-xl hover:bg-slate-50 text-sm font-bold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={savingClient}
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md disabled:bg-blue-400 text-sm"
                >
                  {savingClient ? 'Salvando...' : 'Salvar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
