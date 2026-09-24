import React, { useState, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Send, 
  Snowflake, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  FileCheck,
  CreditCard,
  Layers,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import logoIcon from '../assets/icon/icon.png';

export default function OrcamentoPDFModal({ orcamento, onClose }) {
  const [detalharValores, setDetalharValores] = useState(true);
  
  // Detecção inteligente da resolução vertical da tela para ajustar o zoom inicial
  const [zoom, setZoom] = useState(() => {
    if (typeof window !== 'undefined' && window.innerHeight < 820) {
      return 85; // notebook ~768p / telas menores
    }
    return 100;
  });

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!orcamento) return null;

  const valorTotal = Number(orcamento.valor || 0);
  const temDetalhes = orcamento.valorMaoObra || orcamento.valorCobre || orcamento.valorSuporte || orcamento.valorExtras;

  // Cálculo de desconto no PIX
  let percentualPix = 0;
  if (orcamento.descontoPix?.includes('10%')) percentualPix = 0.10;
  else if (orcamento.descontoPix?.includes('5%')) percentualPix = 0.05;
  const valorComPix = valorTotal * (1 - percentualPix);

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const pixInfo = percentualPix > 0 
      ? `\n• *PIX com Desconto:* R$ ${valorComPix.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${orcamento.descontoPix})` 
      : '';
    const capInfo = orcamento.capacidade ? `\n• *Equipamento:* ${orcamento.capacidade} ${orcamento.tecnologia || ''} (${orcamento.voltagem || '220V'})` : '';
    
    let materiaisDetalhados = '';
    if (detalharValores && temDetalhes) {
      if (orcamento.valorCobre) materiaisDetalhados += `\n  - Tubulação Cobre: R$ ${Number(orcamento.valorCobre).toFixed(2)}`;
      if (orcamento.valorSuporte) materiaisDetalhados += `\n  - Suporte: R$ ${Number(orcamento.valorSuporte).toFixed(2)}`;
      if (orcamento.valorExtras) materiaisDetalhados += `\n  - Outros Insumos: R$ ${Number(orcamento.valorExtras).toFixed(2)}`;
      if (orcamento.valorMaoObra) materiaisDetalhados += `\n  - Mão de Obra: R$ ${Number(orcamento.valorMaoObra).toFixed(2)}`;
    }

    const matInfo = orcamento.metragemCobre ? `\n• *Materiais:* ${orcamento.metragemCobre}${materiaisDetalhados}` : '';
    const supInfo = orcamento.suporteCondensadora ? `\n• *Suporte Externo:* ${orcamento.suporteCondensadora}` : '';
    const garInfo = orcamento.prazoGarantia ? `\n• *Garantia:* ${orcamento.prazoGarantia}` : '';
    const pagInfo = orcamento.condicaoCartao ? `\n• *Cartão:* ${orcamento.condicaoCartao}` : '';

    const msg = `Olá *${orcamento.cliente}*! Segue a sua Proposta Comercial da *JHS Climatizar*:\n\n• *Serviço:* ${orcamento.servico}${capInfo}${matInfo}${supInfo}${garInfo}\n• *Valor Total:* R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}${pixInfo}${pagInfo}\n• *Validade:* ${orcamento.validadeDias || '10 dias'}\n\nEmitimos certificado oficial de garantia da instalação. Podemos agendar a execução do seu serviço? É só me responder por aqui!`;

    const phoneClean = orcamento.telefone?.replace(/\D/g, '') || '';
    const phoneUrl = phoneClean 
      ? `https://wa.me/55${phoneClean}?text=${encodeURIComponent(msg)}` 
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(phoneUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex flex-col print:p-0 print:static print:overflow-visible print:bg-white"
    >
      
      {/* ======================================================== */}
      {/* 1. BARRA SUPERIOR DE AÇÕES (FIXA NO TOPO DO MODAL)       */}
      {/* ======================================================== */}
      <div className="print:hidden w-full bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shrink-0 shadow-lg z-30 flex-wrap gap-2">
        
        {/* Identificação da Proposta */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-2">
              <span>Proposta Nº #{orcamento.numero || '000'}</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {orcamento.status || 'Gerada'}
              </span>
            </h2>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              {orcamento.cliente} • {orcamento.cidade || 'Monte Mor - SP'}
            </p>
          </div>
        </div>

        {/* Controles: Zoom, Detalhar, WhatsApp, Imprimir, Fechar */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Controles de Zoom para ajuste perfeito em qualquer resolução */}
          <div className="flex items-center bg-slate-800 rounded-xl p-0.5 sm:p-1 border border-slate-700/60 text-slate-300 text-xs">
            <button
              onClick={() => setZoom(prev => Math.max(prev - 10, 50))}
              className="p-1 sm:p-1.5 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 sm:px-2 font-mono text-[10px] sm:text-[11px] font-semibold text-slate-200 select-none">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
              className="p-1 sm:p-1.5 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(100)}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] font-bold rounded-md transition-colors ml-0.5 ${zoom === 100 ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-slate-700 text-slate-400'}`}
              title="Tamanho Real (100%)"
            >
              100%
            </button>
            <button
              onClick={() => setZoom(75)}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] font-bold rounded-md transition-colors ${zoom === 75 ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-slate-700 text-slate-400'}`}
              title="Ajustar à tela de notebook (75%)"
            >
              Ajustar
            </button>
          </div>

          {temDetalhes && (
            <button 
              onClick={() => setDetalharValores(!detalharValores)}
              className={`flex items-center gap-1.5 text-xs font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl transition-all shadow-sm ${detalharValores ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}
              title="Mostrar/Ocultar preços detalhados de material"
            >
              {detalharValores ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{detalharValores ? 'Ocultar Detalhes' : 'Detalhar'}</span>
            </button>
          )}

          <button 
            onClick={handleSendWhatsApp}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl transition-all shadow-sm"
            title="Compartilhar pelo WhatsApp"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl transition-all shadow-sm"
            title="Imprimir ou Salvar em PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF / Imprimir</span>
          </button>

          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors ml-1 border border-transparent hover:border-slate-700"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ÁREA DE VISUALIZAÇÃO COM SCROLL SUAVE (CANVAS)        */}
      {/* ======================================================== */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 flex justify-center items-start print:p-0 print:m-0 print:overflow-visible"
        onClick={onClose}
      >
        <div 
          style={{ zoom: `${zoom}%` }}
          className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200/90 my-2 sm:my-4 transition-transform duration-150 print:border-none print:shadow-none print:rounded-none print:m-0 print:p-0 print:max-w-none print:w-full print:block"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* ======================================================== */}
          {/* FOLHA DA PROPOSTA (LAYOUT OFICIAL IMPRESSÃO / PDF)        */}
          {/* ======================================================== */}
          <div id="folha-proposta" className="p-4 sm:p-6 md:p-8 print:p-0 print:m-0 text-slate-800 bg-white">
            
            {/* Cabeçalho da Empresa */}
            <div className="flex flex-col sm:flex-row print:flex-row justify-between items-start sm:items-center print:items-center border-b-2 border-slate-900 pb-3 sm:pb-3.5 print:pb-2 mb-3.5 sm:mb-4 print:mb-2 gap-3 print:gap-2">
              <div className="flex items-center gap-3 print:gap-2">
                <div className="w-12 h-12 sm:w-13 sm:h-13 print:w-10 print:h-10 rounded-2xl print:rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-blue-50 border border-blue-100 p-1 shrink-0">
                  <img src={logoIcon} alt="JHS Climatizar" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl print:text-lg font-black text-slate-900 tracking-tight leading-tight">
                    JHS <span className="text-blue-600">CLIMATIZAR</span>
                  </h1>
                  <p className="text-[10px] sm:text-xs print:text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                    Engenharia e Soluções Térmicas
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right print:text-right text-xs print:text-[9px] text-slate-600 space-y-0.5">
                <p className="font-bold text-slate-900">JHS Climatizar Ltda.</p>
                <p className="flex items-center sm:justify-end print:justify-end gap-1">
                  <MapPin className="w-3 h-3 print:w-2.5 print:h-2.5 text-slate-400" />
                  Monte Mor - SP • RMC
                </p>
                <p className="flex items-center sm:justify-end print:justify-end gap-1">
                  <Phone className="w-3 h-3 print:w-2.5 print:h-2.5 text-slate-400" />
                  (19) 99232-7227
                </p>
                <p className="flex items-center sm:justify-end print:justify-end gap-1 text-[11px] print:text-[8px] text-slate-500">
                  Instagram: @RODRIGO_JHSCLIMATIZAR
                </p>
              </div>
            </div>

            {/* Dados da Proposta & Cliente */}
            <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-4 sm:gap-6 print:gap-2 bg-slate-50 p-3.5 sm:p-4 print:p-2 rounded-2xl print:rounded-xl border border-slate-200/80 mb-3.5 sm:mb-4 print:mb-2 text-sm print:text-xs">
              <div>
                <p className="text-[11px] print:text-[8px] font-bold uppercase tracking-wider text-slate-400">Cliente / Contratante</p>
                <p className="font-bold text-slate-900 text-base print:text-xs mt-0.5">{orcamento.cliente}</p>
                {orcamento.telefone && (
                  <p className="text-slate-600 text-xs print:text-[9px] mt-0.5">Contato: {orcamento.telefone}</p>
                )}
                {orcamento.cidade && (
                  <p className="text-slate-600 text-xs print:text-[9px]">Localidade: {orcamento.cidade}</p>
                )}
              </div>

              <div className="sm:text-right print:text-right mt-2 sm:mt-0 print:mt-0 border-t border-slate-200 sm:border-0 print:border-0 pt-3 sm:pt-0 print:pt-0">
                <p className="text-[11px] print:text-[8px] font-bold uppercase tracking-wider text-slate-400">Dados da Proposta</p>
                <p className="font-bold text-slate-900 text-base print:text-xs mt-0.5">Nº #{orcamento.numero || '000'}</p>
                <p className="text-slate-600 text-xs print:text-[9px] mt-0.5">Data de Emissão: {orcamento.data || new Date().toLocaleDateString('pt-BR')}</p>
                <p className="text-slate-500 text-xs print:text-[9px]">Validade da Proposta: {orcamento.validadeDias || '10 dias'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] print:text-[8px] font-bold bg-blue-100 text-blue-800">
                  Status: {orcamento.status || 'Gerada'}
                </span>
              </div>
            </div>

            {/* 1. FICHA TÉCNICA DO EQUIPAMENTO & AMBIENTE */}
            <div className="mb-3.5 sm:mb-4 print:mb-2">
              <h3 className="text-xs print:text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2 print:mb-1 flex items-center gap-1.5">
                <Snowflake className="w-4 h-4 print:w-3 print:h-3 text-blue-600" />
                1. Ficha Técnica do Equipamento & Aplicação
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 print:grid-cols-4 gap-2 sm:gap-2.5 print:gap-1.5">
                <div className="p-2.5 sm:p-3 print:p-1.5 bg-slate-50 rounded-xl print:rounded-lg border border-slate-200/70">
                  <span className="text-[10px] print:text-[8px] uppercase font-bold text-slate-400 block">Capacidade</span>
                  <span className="text-xs print:text-[10px] font-bold text-blue-700">{orcamento.capacidade || '12.000 BTUs'}</span>
                </div>

                <div className="p-2.5 sm:p-3 print:p-1.5 bg-slate-50 rounded-xl print:rounded-lg border border-slate-200/70">
                  <span className="text-[10px] print:text-[8px] uppercase font-bold text-slate-400 block">Tecnologia</span>
                  <span className="text-xs print:text-[10px] font-bold text-slate-800">{orcamento.tecnologia || 'Inverter'}</span>
                </div>

                <div className="p-2.5 sm:p-3 print:p-1.5 bg-slate-50 rounded-xl print:rounded-lg border border-slate-200/70">
                  <span className="text-[10px] print:text-[8px] uppercase font-bold text-slate-400 block">Tensão Elétrica</span>
                  <span className="text-xs print:text-[10px] font-bold text-slate-800">{orcamento.voltagem || '220V'}</span>
                </div>

                <div className="p-2.5 sm:p-3 print:p-1.5 bg-slate-50 rounded-xl print:rounded-lg border border-slate-200/70">
                  <span className="text-[10px] print:text-[8px] uppercase font-bold text-slate-400 block">Local / Cômodo</span>
                  <span className="text-xs print:text-[10px] font-bold text-slate-800 truncate block">{orcamento.ambiente || 'Residencial / Comercial'}</span>
                </div>
              </div>
            </div>

            {/* 2. TABELA DE ESCOPO DE SERVIÇOS & MATERIAIS */}
            <div className="mb-3.5 sm:mb-4 print:mb-2">
              <h3 className="text-xs print:text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2 print:mb-1 flex items-center gap-1.5">
                <Layers className="w-4 h-4 print:w-3 print:h-3 text-blue-600" />
                2. Discriminação dos Serviços & Padrão Técnico
              </h3>
              
              <div className="overflow-x-auto rounded-xl print:rounded-lg border border-slate-200">
                <table className="w-full min-w-[480px] print:min-w-0 text-left border-collapse overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 text-xs print:text-[8px] font-bold uppercase">
                      <th className="p-2.5 sm:p-3 print:py-1 print:px-2 pl-3.5 border-b border-slate-200 w-1/3">Serviço / Escopo</th>
                      <th className="p-2.5 sm:p-3 print:py-1 print:px-2 border-b border-slate-200">Materiais & Procedimentos Inclusos</th>
                      <th className="p-2.5 sm:p-3 print:py-1 print:px-2 pr-3.5 border-b border-slate-200 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs print:text-[9px] divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 sm:p-3.5 print:py-1.5 print:px-2 pl-3.5 font-bold text-slate-900 align-top">
                        <p className="text-sm print:text-[10px] font-bold text-slate-900">{orcamento.servico}</p>
                        
                        <div className="mt-1.5 print:mt-1 space-y-0.5 text-[11px] print:text-[8px] text-slate-600">
                          <p>• <strong>Tempo Estimado:</strong> {orcamento.tempoEstimado || '3 a 4 horas'}</p>
                          <p>• <strong>Elétrica & Dreno:</strong> {orcamento.pontoEletricoDreno || 'Ponto 220V por conta do cliente'}</p>
                        </div>

                        {orcamento.observacoes && (
                          <p className="text-slate-500 font-normal italic mt-1.5 print:mt-1 text-[11px] print:text-[8px] bg-amber-50/60 p-1.5 print:p-1 rounded-lg border border-amber-200/60">
                            <strong>Obs:</strong> {orcamento.observacoes}
                          </p>
                        )}
                      </td>

                      <td className="p-3 sm:p-3.5 print:py-1.5 print:px-2 text-slate-600 leading-relaxed align-top">
                        <ul className="space-y-1 print:space-y-0.5">
                          <li className="flex items-start gap-1.5 print:gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 print:w-2.5 print:h-2.5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Linha Frigorígena:</strong> {orcamento.metragemCobre || 'Até 3m de tubulação 100% cobre com isolamento blindado'}.</span>
                          </li>
                          <li className="flex items-start gap-1.5 print:gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 print:w-2.5 print:h-2.5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Suporte da Condensadora:</strong> {orcamento.suporteCondensadora || 'Incluso mão-francesa em aço'}.</span>
                          </li>
                          <li className="flex items-start gap-1.5 print:gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 print:w-2.5 print:h-2.5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Processo de Vácuo Digital:</strong> evacuação do sistema abaixo de 500 microns com vacuômetro de precisão.</span>
                          </li>
                          <li className="flex items-start gap-1.5 print:gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 print:w-2.5 print:h-2.5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Teste de Estanqueidade:</strong> pressurização e verificação de flanges contra vazamentos.</span>
                          </li>
                          <li className="flex items-start gap-1.5 print:gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 print:w-2.5 print:h-2.5 text-blue-600 shrink-0 mt-0.5" />
                            <span><strong>Furação Limpa:</strong> perfuração em alvenaria com aspiração de poeira contínua.</span>
                          </li>
                        </ul>

                        {detalharValores && temDetalhes && (
                          <div className="mt-3 print:mt-1.5 p-2.5 print:p-1.5 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-[10px] print:text-[8px] font-bold uppercase text-slate-500 mb-1">Composição dos Valores</p>
                            <div className="space-y-0.5 text-[11px] print:text-[8px]">
                              {orcamento.valorCobre && (
                                <div className="flex justify-between">
                                  <span>Infraestrutura / Cobre:</span>
                                  <span className="font-semibold text-slate-700">R$ {Number(orcamento.valorCobre).toFixed(2)}</span>
                                </div>
                              )}
                              {orcamento.valorSuporte && (
                                <div className="flex justify-between">
                                  <span>Suporte Condensadora:</span>
                                  <span className="font-semibold text-slate-700">R$ {Number(orcamento.valorSuporte).toFixed(2)}</span>
                                </div>
                              )}
                              {orcamento.valorExtras && (
                                <div className="flex justify-between">
                                  <span>Materiais Extras:</span>
                                  <span className="font-semibold text-slate-700">R$ {Number(orcamento.valorExtras).toFixed(2)}</span>
                                </div>
                              )}
                              {orcamento.valorMaoObra && (
                                <div className="flex justify-between">
                                  <span>Mão de Obra Especializada:</span>
                                  <span className="font-semibold text-slate-700">R$ {Number(orcamento.valorMaoObra).toFixed(2)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="p-3 sm:p-3.5 print:py-1.5 print:px-2 pr-3.5 font-extrabold text-slate-900 text-base print:text-xs text-right align-top whitespace-nowrap">
                        R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. CONDIÇÕES COMERCIAIS & FORMAS DE PAGAMENTO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-4 sm:gap-6 print:gap-2 text-xs text-slate-700 bg-slate-50 p-3.5 sm:p-4 print:p-2 rounded-2xl print:rounded-xl border border-slate-200 mb-3.5 sm:mb-4 print:mb-2">
              <div>
                <p className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 print:mb-1 text-xs print:text-[9px] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 print:w-3 print:h-3 text-blue-600" />
                  Opções de Pagamento:
                </p>
                <div className="space-y-1.5 print:space-y-1 text-xs print:text-[9px]">
                  {percentualPix > 0 && (
                    <div className="p-2 sm:p-2.5 print:p-1.5 bg-emerald-50 rounded-xl print:rounded-lg border border-emerald-200">
                      <p className="font-bold text-emerald-900">
                        • Opção 1: À Vista no PIX ({orcamento.descontoPix})
                      </p>
                      <p className="text-emerald-700 text-sm print:text-[10px] font-black mt-0.5">
                        R$ {valorComPix.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                  <div className="p-2 sm:p-2.5 print:p-1.5 bg-white rounded-xl print:rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-800">
                      • Opção 2: Cartão de Crédito
                    </p>
                    <p className="text-slate-600 mt-0.5">
                      {orcamento.condicaoCartao || 'Em até 12x no cartão de crédito'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:text-right print:text-right flex flex-col justify-between">
                <div>
                  <span className="text-[10px] print:text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Validade da Proposta</span>
                  <span className="text-xs print:text-[9px] font-semibold text-slate-700">{orcamento.validadeDias || '10 dias'} a contar da emissão</span>
                </div>

                <div className="mt-3 print:mt-1 pt-2.5 print:pt-1 border-t border-slate-200">
                  <p className="text-slate-400 text-xs print:text-[8px]">Valor Total da Proposta:</p>
                  <p className="text-2xl sm:text-3xl print:text-base font-black text-slate-900">
                    R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. TERMO DE GARANTIA OFICIAL */}
            <div className="p-3.5 sm:p-4 print:p-2 rounded-2xl print:rounded-xl bg-blue-50/70 border border-blue-200 mb-3.5 sm:mb-4 print:mb-2 text-xs print:text-[8.5px] text-blue-950">
              <div className="flex items-center gap-2 font-bold text-sm print:text-[9px] mb-1 text-blue-800">
                <ShieldCheck className="w-5 h-5 print:w-3.5 print:h-3.5 text-blue-600" />
                <span>Certificado de Garantia de Mão de Obra e Estanqueidade</span>
              </div>
              <p className="leading-relaxed print:leading-tight text-blue-900/90">
                A <strong>JHS Climatizar</strong> assegura garantia de <strong>{orcamento.prazoGarantia || '90 dias'}</strong> sobre o serviço executado, cobrindo integralmente qualquer vício de montagem mecânica ou vazamento de fluido em flanges. Os procedimentos técnicos adotados preservam a garantia de fábrica do aparelho contra avarias decorrentes de instalação incorreta.
              </p>
            </div>

            {/* 5. ASSINATURAS E ACEITE */}
            <div className="pt-4 sm:pt-5 print:pt-2 border-t border-slate-200 grid grid-cols-2 gap-6 sm:gap-8 print:gap-4 text-xs print:text-[8.5px]">
              <div className="text-center">
                <div className="border-b border-slate-400 pb-1 print:pb-0.5 mb-1 print:mb-0.5 font-bold text-slate-900">
                  JHS Climatizar
                </div>
                <p className="text-[10px] print:text-[7.5px] text-slate-500 uppercase tracking-wider">
                  Responsável Técnico Especializado
                </p>
              </div>

              <div className="text-center">
                <div className="border-b border-slate-400 pb-1 print:pb-0.5 mb-1 print:mb-0.5 font-bold text-slate-900">
                  {orcamento.cliente}
                </div>
                <p className="text-[10px] print:text-[7.5px] text-slate-500 uppercase tracking-wider">
                  De Acordo / Aceite do Contratante
                </p>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-3 print:mt-1 text-center text-[10px] print:text-[8px] text-slate-400">
              Monte Mor - SP, {orcamento.data || new Date().toLocaleDateString('pt-BR')} • JHS Climatizar - Excelência em Soluções Térmicas
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
