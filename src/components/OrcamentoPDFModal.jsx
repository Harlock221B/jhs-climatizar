import React from 'react';
import { 
  X, 
  Printer, 
  Send, 
  Snowflake, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  FileCheck,
  Wrench,
  Clock,
  Zap,
  CreditCard,
  Layers,
  Sparkles
} from 'lucide-react';

export default function OrcamentoPDFModal({ orcamento, onClose }) {
  if (!orcamento) return null;

  const valorTotal = Number(orcamento.valor || 0);

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
    const matInfo = orcamento.metragemCobre ? `\n• *Materiais:* ${orcamento.metragemCobre}` : '';
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
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      
      {/* Container Principal */}
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-6 border border-slate-200 flex flex-col">
        
        {/* Barra Superior de Ações (Oculta na Impressão via CSS) */}
        <div className="print:hidden bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm">Visualização de Proposta & Garantia</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleSendWhatsApp}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-sm"
              title="Compartilhar pelo WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar WhatsApp</span>
            </button>

            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-sm"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Salvar em PDF / Imprimir</span>
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FOLHA DA PROPOSTA (LAYOUT OFICIAL IMPRESSÃO / PDF)        */}
        {/* ======================================================== */}
        <div id="folha-proposta" className="p-8 sm:p-12 text-slate-800 bg-white">
          
          {/* Cabeçalho da Empresa */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-900 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-md">
                <Snowflake className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  JHS <span className="text-blue-600">CLIMATIZAR</span>
                </h1>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Engenharia e Soluções Térmicas
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5">
              <p className="font-bold text-slate-900">JHS Climatizar Ltda.</p>
              <p className="flex items-center sm:justify-end gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Monte Mor - SP • RMC
              </p>
              <p className="flex items-center sm:justify-end gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                (19) 99232-7227
              </p>
              <p className="flex items-center sm:justify-end gap-1 text-[11px] text-slate-500">
                Instagram: @RODRIGO_JHSCLIMATIZAR
              </p>
            </div>
          </div>

          {/* Dados da Proposta & Cliente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 mb-8 text-sm">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Cliente / Contratante</p>
              <p className="font-bold text-slate-900 text-base mt-0.5">{orcamento.cliente}</p>
              {orcamento.telefone && (
                <p className="text-slate-600 text-xs mt-1">Contato: {orcamento.telefone}</p>
              )}
              {orcamento.cidade && (
                <p className="text-slate-600 text-xs">Localidade: {orcamento.cidade}</p>
              )}
            </div>

            <div className="sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dados da Proposta</p>
              <p className="font-bold text-slate-900 text-base mt-0.5">Nº #{orcamento.numero || '000'}</p>
              <p className="text-slate-600 text-xs mt-1">Data de Emissão: {orcamento.data || new Date().toLocaleDateString('pt-BR')}</p>
              <p className="text-slate-500 text-xs">Validade da Proposta: {orcamento.validadeDias || '10 dias'}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                Status: {orcamento.status}
              </span>
            </div>
          </div>

          {/* 1. FICHA TÉCNICA DO EQUIPAMENTO & AMBIENTE */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Snowflake className="w-4 h-4 text-blue-600" />
              1. Ficha Técnica do Equipamento & Aplicação
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Capacidade</span>
                <span className="text-xs font-bold text-blue-700">{orcamento.capacidade || '12.000 BTUs'}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tecnologia</span>
                <span className="text-xs font-bold text-slate-800">{orcamento.tecnologia || 'Inverter'}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tensão Elétrica</span>
                <span className="text-xs font-bold text-slate-800">{orcamento.voltagem || '220V'}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Local / Cômodo</span>
                <span className="text-xs font-bold text-slate-800 truncate block">{orcamento.ambiente || 'Residencial / Comercial'}</span>
              </div>
            </div>
          </div>

          {/* 2. TABELA DE ESCOPO DE SERVIÇOS & MATERIAIS */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              2. Discriminação dos Serviços & Padrão Técnico
            </h3>
            
            <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                  <th className="p-3 pl-4 border-b border-slate-200">Serviço / Escopo</th>
                  <th className="p-3 border-b border-slate-200">Materiais & Procedimentos Inclusos</th>
                  <th className="p-3 pr-4 border-b border-slate-200 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-200">
                <tr>
                  <td className="p-4 pl-4 font-bold text-slate-900 align-top w-2/5">
                    <p className="text-sm font-bold text-slate-900">{orcamento.servico}</p>
                    
                    <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                      <p>• <strong>Tempo Estimado:</strong> {orcamento.tempoEstimado || '3 a 4 horas'}</p>
                      <p>• <strong>Elétrica & Dreno:</strong> {orcamento.pontoEletricoDreno || 'Ponto 220V por conta do cliente'}</p>
                    </div>

                    {orcamento.observacoes && (
                      <p className="text-slate-500 font-normal italic mt-2 text-[11px] bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                        <strong>Obs:</strong> {orcamento.observacoes}
                      </p>
                    )}
                  </td>

                  <td className="p-4 text-slate-600 leading-relaxed align-top">
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span><strong>Linha Frigorígena:</strong> {orcamento.metragemCobre || 'Até 3m de tubulação 100% cobre com isolamento blindado'}.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span><strong>Suporte da Condensadora:</strong> {orcamento.suporteCondensadora || 'Incluso mão-francesa em aço'}.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span><strong>Processo de Vácuo Digital:</strong> evacuação do sistema abaixo de 500 microns com vacuômetro de precisão.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span><strong>Teste de Estanqueidade:</strong> pressurização e verificação de flanges contra vazamentos.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span><strong>Furação Limpa:</strong> perfuração em alvenaria com aspiração de poeira contínua.</span>
                      </li>
                    </ul>
                  </td>

                  <td className="p-4 pr-4 font-extrabold text-slate-900 text-base text-right align-top whitespace-nowrap">
                    R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. CONDIÇÕES COMERCIAIS & FORMAS DE PAGAMENTO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8">
            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-600" />
                Opções de Pagamento:
              </p>
              <div className="space-y-2 text-xs">
                {percentualPix > 0 && (
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="font-bold text-emerald-900">
                      • Opção 1: À Vista no PIX ({orcamento.descontoPix})
                    </p>
                    <p className="text-emerald-700 text-sm font-black mt-0.5">
                      R$ {valorComPix.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">
                    • Opção 2: Cartão de Crédito
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    {orcamento.condicaoCartao || 'Em até 12x no cartão de crédito'}
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:text-right flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Validade da Proposta</span>
                <span className="text-xs font-semibold text-slate-700">{orcamento.validadeDias || '10 dias'} a contar da emissão</span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200">
                <p className="text-slate-400 text-xs">Valor Total da Proposta:</p>
                <p className="text-3xl font-black text-slate-900">
                  R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* 4. TERMO DE GARANTIA OFICIAL */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 mb-8 text-xs text-blue-950">
            <div className="flex items-center gap-2 font-bold text-sm mb-2 text-blue-800">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Certificado de Garantia de Mão de Obra e Estanqueidade</span>
            </div>
            <p className="leading-relaxed text-blue-900/90">
              A <strong>JHS Climatizar</strong> assegura garantia de <strong>{orcamento.prazoGarantia || '90 dias'}</strong> sobre o serviço executado, cobrindo integralmente qualquer vício de montagem mecânica ou vazamento de fluido em flanges. Os procedimentos técnicos adotados preservam a garantia de fábrica do aparelho contra avarias decorrentes de instalação incorreta.
            </p>
          </div>

          {/* 5. ASSINATURAS E ACEITE */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
            <div className="text-center">
              <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-900">
                JHS Climatizar
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                Responsável Técnico Especializado
              </p>
            </div>

            <div className="text-center">
              <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-900">
                {orcamento.cliente}
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                De Acordo / Aceite do Contratante
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-[10px] text-slate-400">
            Monte Mor - SP, {orcamento.data || new Date().toLocaleDateString('pt-BR')} • JHS Climatizar - Excelência em Soluções Térmicas
          </div>

        </div>

      </div>

    </div>
  );
}
