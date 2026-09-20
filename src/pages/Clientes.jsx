import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  X, 
  Loader2, 
  Wrench, 
  Clock, 
  Send, 
  BellRing, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { subscribeClientes, addCliente, deleteCliente } from '../services/db';

export default function Clientes() {
  const [searchParams] = useSearchParams();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filtroRecorrencia, setFiltroRecorrencia] = useState(
    searchParams.get('filtro') === 'recorrencia'
  );

  useEffect(() => {
    if (searchParams.get('filtro') === 'recorrencia') {
      setFiltroRecorrencia(true);
    }
  }, [searchParams]);

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    totalServicos: 1,
    aparelho: 'Split 12.000 BTUs Inverter',
    dataUltimoServico: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const unsubscribe = subscribeClientes((data) => {
      setClientes(data);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddCliente = async (e) => {
    e.preventDefault();
    if (!formData.nome.trim()) return;

    setSaving(true);
    try {
      await addCliente({
        ...formData,
        totalServicos: Number(formData.totalServicos) || 1
      });
      setFormData({ 
        nome: '', 
        telefone: '', 
        email: '', 
        endereco: '', 
        totalServicos: 1,
        aparelho: 'Split 12.000 BTUs Inverter',
        dataUltimoServico: new Date().toISOString().split('T')[0]
      });
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao adicionar cliente:", err);
      alert("Erro ao salvar cliente no Firebase.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente ${nome}?`)) {
      try {
        await deleteCliente(id);
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir cliente.");
      }
    }
  };

  // Cálculo de Recorrência (Ciclo de 6 meses para higienização)
  const getRecorrenciaInfo = (cliente) => {
    // Usa dataUltimoServico ou createdAt
    let dataReferencia = cliente.dataUltimoServico;
    if (!dataReferencia && cliente.createdAt?.toDate) {
      dataReferencia = cliente.createdAt.toDate().toISOString().split('T')[0];
    }

    if (!dataReferencia) {
      return { status: 'em_dia', texto: 'Sem histórico de data', dias: 0, precisaLembrete: false };
    }

    const dataServico = new Date(dataReferencia);
    const diffTime = Math.abs(new Date() - dataServico);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 6 meses = 180 dias
    if (diffDays >= 180) {
      const meses = Math.floor(diffDays / 30);
      return { 
        status: 'vencida', 
        texto: `Ciclo de 6 meses completo (último serviço há ${meses} meses)`, 
        dias: diffDays,
        precisaLembrete: true 
      };
    } else if (diffDays >= 150) {
      return { 
        status: 'alerta', 
        texto: '5º mês completo (completará 6 meses em breve)', 
        dias: diffDays,
        precisaLembrete: true 
      };
    }

    return { 
      status: 'em_dia', 
      texto: `Higienizado há ${Math.floor(diffDays / 30)} meses`, 
      dias: diffDays,
      precisaLembrete: false 
    };
  };

  const handleSendReminder = (cliente) => {
    const aparelhoText = cliente.aparelho ? ` do seu ${cliente.aparelho}` : '';
    const msg = `Olá ${cliente.nome}! Tudo bem? Aqui é da equipe JHS Climatizar.\n\nIdentificamos em nosso sistema que já completou o ciclo de 6 meses desde o último serviço no ar-condicionado${aparelhoText}.\n\nPara garantir que o equipamento continue gelando perfeitamente, economizando energia e garantindo ar puro livre de fungos para sua família, que tal agendarmos a higienização preventiva desta temporada? Podemos verificar a melhor data para você!`;
    const cleanPhone = cliente.telefone?.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const clientesFiltrados = clientes.filter(c => {
    const matchesSearch = 
      c.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefone?.includes(searchTerm) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.aparelho?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filtroRecorrencia) {
      const rec = getRecorrenciaInfo(c);
      return matchesSearch && rec.precisaLembrete;
    }
    return matchesSearch;
  });

  const totalPrecisandoLembrete = clientes.filter(c => getRecorrenciaInfo(c).precisaLembrete).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clientes & Recorrência</h1>
          <p className="text-slate-500 text-sm">Histórico de equipamentos e lembretes automáticos de 6 meses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 text-sm"
          >
            <Plus className="w-4 h-4" /> Cadastrar Cliente
          </button>
        </div>
      </div>

      {/* Banner / Filtro Rápido de Recorrência */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
            <BellRing className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Automação de Recorrência Semestral</h3>
            <p className="text-xs text-blue-100">
              {totalPrecisandoLembrete === 0 
                ? 'Todos os seus clientes estão com a manutenção preventiva em dia!' 
                : `${totalPrecisandoLembrete} ${totalPrecisandoLembrete === 1 ? 'cliente completou' : 'clientes completaram'} o ciclo de 6 meses e precisam de higienização.`}
            </p>
          </div>
        </div>

        {totalPrecisandoLembrete > 0 && (
          <button 
            onClick={() => setFiltroRecorrencia(!filtroRecorrencia)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filtroRecorrencia 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {filtroRecorrencia ? 'Ver Todos os Clientes' : `Ver ${totalPrecisandoLembrete} para Lembrar`}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden">
        
        {/* Barra de Busca */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nome, telefone, aparelho..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors shadow-sm"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {clientesFiltrados.length} {clientesFiltrados.length === 1 ? 'cliente encontrado' : 'clientes encontrados'}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
            <p>Carregando clientes...</p>
          </div>
        ) : clientesFiltrados.length === 0 ? (
          /* Empty State */
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Nenhum cliente nesta lista</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
              {filtroRecorrencia ? 'Nenhum cliente precisando de lembrete com esses filtros.' : 'Cadastre seu primeiro cliente para ativar o histórico técnico.'}
            </p>
            {filtroRecorrencia ? (
              <button 
                onClick={() => setFiltroRecorrencia(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl text-xs"
              >
                Voltar à lista completa
              </button>
            ) : (
              <button 
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm"
              >
                + Cadastrar Cliente
              </button>
            )}
          </div>
        ) : (
          /* Grid de Clientes */
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
            {clientesFiltrados.map(cliente => {
              const recorrencia = getRecorrenciaInfo(cliente);

              return (
                <div key={cliente.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all group relative bg-white flex flex-col justify-between">
                  <div>
                    <button 
                      onClick={() => handleDelete(cliente.id, cliente.nome)}
                      title="Excluir cliente"
                      className="absolute top-4 right-4 p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-700 font-extrabold text-lg shadow-inner border border-blue-200 shrink-0">
                        {cliente.nome?.charAt(0).toUpperCase() || 'C'}
                      </div>
                      <div className="pr-6 overflow-hidden">
                        <h3 className="font-bold text-slate-800 text-base leading-tight truncate">{cliente.nome}</h3>
                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                          {cliente.totalServicos || 1} {cliente.totalServicos === 1 ? 'atendimento' : 'atendimentos'}
                        </span>
                      </div>
                    </div>

                    {/* Ficha do Equipamento do Cliente */}
                    {cliente.aparelho && (
                      <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs">
                        <Wrench className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-700 truncate" title={cliente.aparelho}>
                          {cliente.aparelho}
                        </span>
                      </div>
                    )}

                    {/* Dados de Contato */}
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {cliente.telefone ? (
                          <a href={`tel:${cliente.telefone}`} className="hover:text-blue-600 transition-colors">{cliente.telefone}</a>
                        ) : (
                          <span className="text-slate-400 italic">Sem telefone</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {cliente.email ? (
                          <a href={`mailto:${cliente.email}`} className="hover:text-blue-600 transition-colors truncate">{cliente.email}</a>
                        ) : (
                          <span className="text-slate-400 italic">Sem e-mail</span>
                        )}
                      </div>
                      <div className="flex items-start gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{cliente.endereco || 'Endereço não informado'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Alerta de Recorrência & Ações */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    {/* Badge de Recorrência */}
                    {recorrencia.precisaLembrete ? (
                      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2.5 text-xs flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="font-bold text-[11px] truncate" title={recorrencia.texto}>
                            Higienização Recomendada
                          </span>
                        </div>
                        <button 
                          onClick={() => handleSendReminder(cliente)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded-lg text-[10px] flex items-center gap-1 shrink-0 shadow-sm"
                          title="Enviar lembrete pelo WhatsApp"
                        >
                          <Send className="w-3 h-3" />
                          Lembrar
                        </button>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Manutenção em dia ({recorrencia.texto})</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <a 
                        href={`https://wa.me/55${cliente.telefone?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white font-bold py-2 rounded-xl text-xs transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal Adicionar Cliente */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Cadastrar Cliente & Equipamento</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCliente} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Nome Completo *</label>
                <input 
                  type="text" 
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Ex: Carlos Silva"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">WhatsApp / Telefone</label>
                  <input 
                    type="text" 
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    placeholder="(19) 99999-9999"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="cliente@email.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Ficha do Equipamento */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Modelo / Aparelho do Cliente</label>
                <input 
                  type="text" 
                  value={formData.aparelho}
                  onChange={(e) => setFormData({...formData, aparelho: e.target.value})}
                  placeholder="Ex: Split 12.000 BTUs Inverter LG Dual Inverter"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Data do Último Serviço</label>
                  <input 
                    type="date" 
                    value={formData.dataUltimoServico}
                    onChange={(e) => setFormData({...formData, dataUltimoServico: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">O sistema lembrará após 6 meses.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Qtd de Aparelhos</label>
                  <input 
                    type="number" 
                    min="1"
                    value={formData.totalServicos}
                    onChange={(e) => setFormData({...formData, totalServicos: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Endereço (Bairro / Cidade)</label>
                <input 
                  type="text" 
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  placeholder="Rua, Número, Bairro, Cidade"
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
                  {saving ? 'Salvando...' : 'Salvar no Firebase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
