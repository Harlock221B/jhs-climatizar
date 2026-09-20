import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Send, 
  X, 
  Loader2, 
  DollarSign, 
  Globe, 
  Printer,
  Snowflake,
  Wrench,
  ShieldCheck,
  CreditCard,
  Clock,
  Layers,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { 
  subscribeOrcamentos, 
  addOrcamento, 
  updateOrcamentoStatus, 
  updateOrcamentoValor, 
  deleteOrcamento 
} from '../services/db';
import OrcamentoPDFModal from '../components/OrcamentoPDFModal';

const DEFAULT_FORM_DATA = {
  cliente: '',
  telefone: '',
  cidade: '',
  servico: 'Instalação Padrão de Ar-Condicionado',
  valor: '',
  status: 'Enviado',
  data: new Date().toLocaleDateString('pt-BR'),
  // 1. Especificações Técnicas
  capacidade: '12.000 BTUs',
  tecnologia: 'Inverter',
  voltagem: '220V',
  ambiente: 'Quarto / Suíte',
  // 2. Escopo & Materiais
  metragemCobre: 'Até 3 metros (tubulação 100% cobre inclusa)',
  suporteCondensadora: 'Incluso (suporte em aço galvanizado)',
  pontoEletricoDreno: 'Ponto 220V e dreno por conta do cliente',
  tempoEstimado: '3 a 4 horas',
  // 3. Pagamento & Garantia
  descontoPix: '5% de desconto',
  condicaoCartao: 'Em até 12x no cartão de crédito',
  validadeDias: '10 dias',
  prazoGarantia: '90 dias de garantia de instalação JHS',
  observacoes: ''
};

export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedForPDF, setSelectedForPDF] = useState(null);

  // Form State
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  useEffect(() => {
    const unsubscribe = subscribeOrcamentos((data) => {
      setOrcamentos(data);
      setLoading(false);
    }, (err) => {
      console.error("Erro ao carregar orçamentos:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddOrcamento = async (e) => {
    e.preventDefault();
    if (!formData.cliente.trim() || !formData.valor) return;

    setSaving(true);
    try {
      const nextNum = (1000 + orcamentos.length + 1).toString();
      await addOrcamento({
        ...formData,
        numero: nextNum,
        valor: parseFloat(formData.valor.toString().replace(',', '.')) || 0,
        createdAtClient: new Date().toISOString()
      });

      setFormData(DEFAULT_FORM_DATA);
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao adicionar orçamento:", err);
      alert("Erro ao salvar no Firestore. Verifique as permissões.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrcamentoStatus(id, newStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetPrice = async (orc) => {
    const input = window.prompt(`Definir valor (R$) para ${orc.cliente}:`, orc.valor ? orc.valor.toString() : '');
    if (input !== null && input.trim() !== '') {
      const val = parseFloat(input.replace(',', '.'));
      if (!isNaN(val)) {
        try {
          await updateOrcamentoValor(orc.id, val);
          if (orc.status === 'Pendente') {
            await updateOrcamentoStatus(orc.id, 'Enviado');
          }
        } catch (err) {
          console.error(err);
          alert("Erro ao atualizar valor.");
        }
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente remover este orçamento?")) {
      try {
        await deleteOrcamento(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSendWhatsApp = (orc) => {
    const valorNum = Number(orc.valor || 0);
    const pixDesc = orc.descontoPix && orc.descontoPix !== 'Sem desconto' 
      ? ` (ou à vista no PIX com ${orc.descontoPix})` 
      : '';
    const capInfo = orc.capacidade ? `\n• *Equipamento:* ${orc.capacidade} ${orc.tecnologia || ''} (${orc.voltagem || '220V'})` : '';
    const matInfo = orc.metragemCobre ? `\n• *Escopo de Materiais:* ${orc.metragemCobre}` : '';
    const supInfo = orc.suporteCondensadora ? `\n• *Suporte Externo:* ${orc.suporteCondensadora}` : '';
    const garInfo = orc.prazoGarantia ? `\n• *Garantia:* ${orc.prazoGarantia}` : '';
    const pagInfo = orc.condicaoCartao ? `\n• *Pagamento:* ${orc.condicaoCartao}${pixDesc}` : '';

    const msg = `Olá *${orc.cliente}*! Aqui é da equipe *JHS Climatizar*.\n\nSegue a proposta formal para o seu ar-condicionado:\n• *Serviço:* ${orc.servico}${capInfo}${matInfo}${supInfo}${garInfo}${pagInfo}\n• *Valor Total:* R$ ${valorNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\nEmitimos certificado formal de garantia e seguimos à risca as normas dos fabricantes. Caso queira aprovar ou reservar a data na agenda, é só me responder aqui!`;

    const phoneClean = orc.telefone?.replace(/\D/g, '') || '';
    const phoneUrl = phoneClean 
      ? `https://wa.me/55${phoneClean}?text=${encodeURIComponent(msg)}` 
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(phoneUrl, '_blank');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Aprovado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Enviado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rejeitado':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const filteredOrcamentos = orcamentos.filter(o => 
    o.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.servico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.capacidade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.numero?.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Orçamentos & Propostas</h1>
          <p className="text-slate-500">Gestão técnica de orçamentos, escopo de instalação e certificado de garantia.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" /> Criar Orçamento Completo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden">
        {/* Barra de Busca */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por cliente, serviço, BTUs ou Nº..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {orcamentos.length} {orcamentos.length === 1 ? 'proposta registrada' : 'propostas registradas'}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
            <p>Carregando orçamentos do Firebase...</p>
          </div>
        ) : filteredOrcamentos.length === 0 ? (
          /* Empty State */
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Nenhum orçamento encontrado</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
              Comece criando uma proposta completa com especificações técnicas e materiais inclusos.
            </p>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm"
            >
              + Criar Primeira Proposta
            </button>
          </div>
        ) : (
          <>
            {/* Tabela Desktop */}
            <div className="hidden md:block overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Nº</th>
                  <th className="p-4">Cliente / Contato</th>
                  <th className="p-4">Serviço & Especificações</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Valor Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredOrcamentos.map((orcamento) => (
                  <tr key={orcamento.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="p-4 pl-6 font-bold text-slate-800">#{orcamento.numero || 'WEB'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{orcamento.cliente}</span>
                        {orcamento.origem === 'Site' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                            <Globe className="w-3 h-3" /> Site
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-1.5">
                        {orcamento.telefone && <span>{orcamento.telefone}</span>}
                        {orcamento.cidade && <span>• {orcamento.cidade}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <p className="font-bold text-slate-800 text-sm">{orcamento.servico}</p>
                      
                      {/* Badges de especificações técnicas */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        {orcamento.capacidade && (
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200/50">
                            {orcamento.capacidade}
                          </span>
                        )}
                        {orcamento.tecnologia && (
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                            {orcamento.tecnologia}
                          </span>
                        )}
                        {orcamento.metragemCobre && (
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-200/50 truncate max-w-[200px]" title={orcamento.metragemCobre}>
                            {orcamento.metragemCobre}
                          </span>
                        )}
                      </div>

                      {orcamento.detalhes && (
                        <p className="text-xs text-slate-500 italic max-w-xs truncate mt-1" title={orcamento.detalhes}>
                          "{orcamento.detalhes}"
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-slate-500 text-xs whitespace-nowrap">{orcamento.data}</td>
                    <td className="p-4 whitespace-nowrap">
                      {Number(orcamento.valor || 0) > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <div>
                            <span className="font-extrabold text-slate-900 text-base">
                              R$ {Number(orcamento.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                            {orcamento.descontoPix && orcamento.descontoPix !== 'Sem desconto' && (
                              <p className="text-[10px] font-bold text-emerald-600">
                                PIX: {orcamento.descontoPix} off
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={() => handleSetPrice(orcamento)}
                            title="Editar valor rápido"
                            className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors"
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleSetPrice(orcamento)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          Definir Valor
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      <select 
                        value={orcamento.status} 
                        onChange={(e) => handleStatusChange(orcamento.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(orcamento.status)}`}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Rejeitado">Rejeitado</option>
                      </select>
                    </td>
                    <td className="p-4 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => setSelectedForPDF(orcamento)}
                          title="Gerar Proposta em PDF / Termo de Garantia"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-100"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleSendWhatsApp(orcamento)}
                          title="Enviar proposta detalhada via WhatsApp"
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-emerald-100"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(orcamento.id)}
                          title="Excluir orçamento"
                          className="p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ======================================================== */}
          {/* CARDS VIEW PARA MOBILE (< 768px)                         */}
          {/* ======================================================== */}
          <div className="block md:hidden p-3.5 space-y-3.5">
            {filteredOrcamentos.map((orcamento) => (
              <div 
                key={orcamento.id} 
                className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400">#{orcamento.numero || 'WEB'}</span>
                      {orcamento.origem === 'Site' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                          Site
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-tight mt-1">{orcamento.cliente}</h3>
                    {(orcamento.telefone || orcamento.cidade) && (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {orcamento.telefone} {orcamento.cidade && `• ${orcamento.cidade}`}
                      </p>
                    )}
                  </div>

                  {/* Status Dropdown Mobile */}
                  <select 
                    value={orcamento.status} 
                    onChange={(e) => handleStatusChange(orcamento.id, e.target.value)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(orcamento.status)}`}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Rejeitado">Rejeitado</option>
                  </select>
                </div>

                {/* Detalhes do Serviço & Badges */}
                <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                  <p className="font-bold text-slate-800 text-xs">{orcamento.servico}</p>
                  
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {orcamento.capacidade && (
                      <span className="text-[10px] font-bold bg-blue-100/70 text-blue-800 px-2 py-0.5 rounded-lg border border-blue-200/50">
                        {orcamento.capacidade}
                      </span>
                    )}
                    {orcamento.tecnologia && (
                      <span className="text-[10px] font-medium bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded-lg">
                        {orcamento.tecnologia}
                      </span>
                    )}
                    {orcamento.metragemCobre && (
                      <span className="text-[10px] font-medium text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded-lg border border-emerald-200/50 truncate max-w-[190px]">
                        {orcamento.metragemCobre}
                      </span>
                    )}
                  </div>
                </div>

                {/* Valor & Ações Rápidas em Linha */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Total</span>
                    <span className="font-black text-slate-900 text-base">
                      R$ {Number(orcamento.valor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    {orcamento.descontoPix && orcamento.descontoPix !== 'Sem desconto' && (
                      <span className="text-[10px] font-bold text-emerald-600 block">
                        PIX: {orcamento.descontoPix} off
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleSendWhatsApp(orcamento)}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-2.5 px-3.5 rounded-xl shadow-sm transition-all"
                      title="Enviar Proposta no WhatsApp"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button 
                      onClick={() => setSelectedForPDF(orcamento)}
                      className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95 rounded-xl border border-blue-200/60 transition-all"
                      title="PDF / Imprimir"
                    >
                      <Printer className="w-4 h-4" />
                    </button>

                    <button 
                      onClick={() => handleDelete(orcamento.id)}
                      className="p-2.5 text-slate-300 hover:text-red-500 rounded-xl transition-all"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      </div>

      {/* Modal Criar Orçamento Completo */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto border border-slate-100">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">JHS Climatizar</span>
                <h3 className="text-xl font-bold text-slate-900">Novo Orçamento Técnico</h3>
              </div>
              <button 
                onClick={() => setModalOpen(false)} 
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOrcamento} className="space-y-6">
              
              {/* 1. DADOS DO CLIENTE */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>1. Dados do Cliente & Local</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nome do Cliente ou Empresa *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.cliente}
                    onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                    placeholder="Ex: Carlos Oliveira ou Clínica Médica Sorriso"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Telefone / WhatsApp</label>
                    <input 
                      type="text" 
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="Ex: (19) 99876-5432"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Cidade / Região</label>
                    <input 
                      type="text" 
                      value={formData.cidade}
                      onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                      placeholder="Ex: Monte Mor, Hortolândia, Campinas..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 2. ESPECIFICAÇÕES TÉCNICAS */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Snowflake className="w-4 h-4 text-blue-600" />
                  <span>2. Especificações do Equipamento & Local</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tipo de Serviço Principal</label>
                    <select 
                      value={formData.servico}
                      onChange={(e) => setFormData({...formData, servico: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    >
                      <option value="Instalação Padrão de Ar-Condicionado">Instalação Padrão</option>
                      <option value="Higienização & Limpeza Química Profunda">Higienização & Limpeza Química</option>
                      <option value="Manutenção Preventiva & Carga de Gás">Manutenção & Carga de Fluido</option>
                      <option value="Desinstalação / Remanejamento">Desinstalação / Remanejamento</option>
                      <option value="Infraestrutura Frigorígena Embutida">Passagem de Infraestrutura</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Capacidade (BTUs)</label>
                    <select 
                      value={formData.capacidade}
                      onChange={(e) => setFormData({...formData, capacidade: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold text-blue-900"
                    >
                      <option value="9.000 BTUs">9.000 BTUs</option>
                      <option value="12.000 BTUs">12.000 BTUs</option>
                      <option value="18.000 BTUs">18.000 BTUs</option>
                      <option value="24.000 BTUs">24.000 BTUs</option>
                      <option value="30.000 BTUs">30.000 BTUs</option>
                      <option value="36.000+ BTUs / Multi-Split">36.000+ BTUs / Multi-Split</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tecnologia</label>
                    <select 
                      value={formData.tecnologia}
                      onChange={(e) => setFormData({...formData, tecnologia: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    >
                      <option value="Inverter">Inverter (Econômico)</option>
                      <option value="Convencional On/Off">Convencional (On/Off)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tensão Elétrica</label>
                    <select 
                      value={formData.voltagem}
                      onChange={(e) => setFormData({...formData, voltagem: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    >
                      <option value="220V">220V</option>
                      <option value="127V / 110V">127V / 110V</option>
                      <option value="Trifásico 220V/380V">Trifásico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Ambiente / Cômodo</label>
                    <input 
                      type="text" 
                      value={formData.ambiente}
                      onChange={(e) => setFormData({...formData, ambiente: e.target.value})}
                      placeholder="Ex: Quarto do casal, Sala..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 3. ESCOPO DE MATERIAIS (O QUE ESTÁ INCLUSO) */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>3. Escopo de Materiais & Instalação</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tubulação de Cobre Inclusa</label>
                    <select 
                      value={formData.metragemCobre}
                      onChange={(e) => setFormData({...formData, metragemCobre: e.target.value})}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    >
                      <option value="Até 3 metros (tubulação 100% cobre inclusa)">Até 3 metros de cobre 100% (Padrão)</option>
                      <option value="Até 5 metros (tubulação 100% cobre inclusa)">Até 5 metros de cobre 100%</option>
                      <option value="Reaproveitamento de infraestrutura existente">Infraestrutura existente no local</option>
                      <option value="Tubulação sob medida (metragem especial)">Tubulação sob medida</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Suporte Unidade Externa</label>
                    <select 
                      value={formData.suporteCondensadora}
                      onChange={(e) => setFormData({...formData, suporteCondensadora: e.target.value})}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    >
                      <option value="Incluso (suporte em aço galvanizado reforçado)">Incluso (Mão-francesa aço galvanizado)</option>
                      <option value="Incluso (suporte de chão com coxins)">Incluso (Chão / Coxins de borracha)</option>
                      <option value="Não incluso / Já existente no local">Não incluso / Já existente</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Ponto Elétrico & Dreno</label>
                    <select 
                      value={formData.pontoEletricoDreno}
                      onChange={(e) => setFormData({...formData, pontoEletricoDreno: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    >
                      <option value="Ponto 220V e dreno por conta do cliente">Ponto 220V e dreno por conta do cliente</option>
                      <option value="Ponto elétrico e dreno inclusos no escopo">Ponto elétrico e dreno inclusos</option>
                      <option value="Infraestrutura já embutida pronta">Infraestrutura embutida pronta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tempo Estimado de Execução</label>
                    <input 
                      type="text" 
                      value={formData.tempoEstimado}
                      onChange={(e) => setFormData({...formData, tempoEstimado: e.target.value})}
                      placeholder="Ex: 3 a 4 horas"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 4. VALORES, PAGAMENTO & GARANTIA */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>4. Valores, Pagamento & Garantia</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Valor Total (R$) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.valor}
                      onChange={(e) => setFormData({...formData, valor: e.target.value})}
                      placeholder="Ex: 650.00"
                      className="w-full px-4 py-2.5 bg-white border-2 border-blue-400 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Desconto no PIX</label>
                    <select 
                      value={formData.descontoPix}
                      onChange={(e) => setFormData({...formData, descontoPix: e.target.value})}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs text-emerald-800 font-semibold"
                    >
                      <option value="5% de desconto">5% de desconto à vista</option>
                      <option value="10% de desconto">10% de desconto à vista</option>
                      <option value="Sem desconto">Sem desconto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Condição no Cartão</label>
                    <select 
                      value={formData.condicaoCartao}
                      onChange={(e) => setFormData({...formData, condicaoCartao: e.target.value})}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    >
                      <option value="Em até 12x no cartão de crédito">Em até 12x no cartão</option>
                      <option value="Em até 6x sem juros">Em até 6x sem juros</option>
                      <option value="50% entrada + 50% na conclusão">50% entrada + 50% entrega</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Garantia de Mão de Obra</label>
                    <select 
                      value={formData.prazoGarantia}
                      onChange={(e) => setFormData({...formData, prazoGarantia: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-medium text-blue-900"
                    >
                      <option value="90 dias de garantia de instalação JHS">90 dias (Padrão legal JHS)</option>
                      <option value="1 ano de garantia total JHS">1 ano de garantia total</option>
                      <option value="6 meses de garantia">6 meses de garantia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Validade da Proposta</label>
                    <select 
                      value={formData.validadeDias}
                      onChange={(e) => setFormData({...formData, validadeDias: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    >
                      <option value="10 dias">10 dias</option>
                      <option value="15 dias">15 dias</option>
                      <option value="7 dias">7 dias</option>
                      <option value="30 dias">30 dias</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Status Inicial</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-bold text-slate-700"
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Pendente">Pendente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Observações Técnicas Adicionais (Opcional)</label>
                  <textarea 
                    rows="2"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                    placeholder="Ex: Não inclui corte em colunas estruturais; cliente disponibilizará escada..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-2 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 disabled:bg-blue-400 transition-all text-sm flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>{saving ? 'Gravando...' : 'Salvar Proposta Completa'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal Visualizador e Impressão de PDF / Termo de Garantia */}
      {selectedForPDF && (
        <OrcamentoPDFModal 
          orcamento={selectedForPDF} 
          onClose={() => setSelectedForPDF(null)} 
        />
      )}
    </div>
  );
}
