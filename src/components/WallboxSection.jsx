import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Building2, 
  Home, 
  ArrowRight, 
  Phone, 
  Maximize2, 
  X, 
  Check, 
  Cpu, 
  BatteryCharging 
} from 'lucide-react';

import fotoWallbox1 from '../assets/img/wallbox-1.png';
import fotoWallbox2 from '../assets/img/wallbox-2.png';
import fotoWallbox3 from '../assets/img/wallbox-3.png';

const fotosGaleria = [
  {
    id: 1,
    src: fotoWallbox1,
    tag: 'Instalação Completa',
    badge: 'Intelbras & GWM',
    titulo: 'Estação de Recarga Montada',
    desc: 'Instalação dupla com eletroduto galvanizado industrial, suportes de cabos e acabamento resistente para garagens residenciais ou comerciais.'
  },
  {
    id: 2,
    src: fotoWallbox2,
    tag: 'Segurança Elétrica',
    badge: 'Quadro Dedicado',
    titulo: 'Proteção com DR e DPS',
    desc: 'Quadro de distribuição exclusivo com disjuntores bipolares independentes, DR contra choques e DPS contra surtos e descargas atmosféricas.'
  },
  {
    id: 3,
    src: fotoWallbox3,
    tag: 'Padrão NBR 5410',
    badge: 'Fiação Técnica',
    titulo: 'Montagem Interna de Precisão',
    desc: 'Condutores 100% cobre devidamente dimensionados, conexões firmes sem risco de aquecimento e barramento de aterramento (PE) com baixa impedância.'
  }
];

const marcasCompativeis = [
  'BYD', 'GWM', 'Volvo', 'BMW', 'Porsche', 'Audi', 'Mercedes-Benz', 'Renault', 'Intelbras', 'WEG'
];

export function WallboxSection() {
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [modalZoom, setModalZoom] = useState(false);

  return (
    <section id="wallbox" className="py-24 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-cyan-200/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
            Eletromobilidade • JHS Climatizar
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            INSTALAÇÃO DE PAINEL PARA CARRO ELÉTRICO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700">
              (WALLBOX)
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            Mais praticidade, segurança e mobilidade para você! Projetos elétricos dedicados com homologação técnica para carregamento residencial e empresarial.
          </p>
        </div>

        {/* Bloco Principal: Imagens Reais + Detalhes do Serviço */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Coluna da Esquerda: Showcase Interativo das Fotos Reais */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Foto Ativa em Destaque */}
            <div className="relative bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group">
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden flex items-center justify-center bg-slate-900">
                <img 
                  src={fotosGaleria[fotoAtiva].src} 
                  alt={fotosGaleria[fotoAtiva].titulo} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                
                {/* Badges superiores na imagem */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-blue-400/40">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    {fotosGaleria[fotoAtiva].badge}
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700/60 shadow-sm">
                    {fotosGaleria[fotoAtiva].tag}
                  </span>
                </div>

                {/* Botão de Zoom */}
                <button
                  onClick={() => setModalZoom(true)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-2xl shadow-lg transition-transform hover:scale-110 z-10"
                  title="Ver imagem ampliada"
                >
                  <Maximize2 className="w-4 h-4 text-blue-600" />
                </button>

                {/* Legenda Informativa no rodapé da imagem */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-white drop-shadow-sm">
                      {fotosGaleria[fotoAtiva].titulo}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-snug line-clamp-2">
                    {fotosGaleria[fotoAtiva].desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Miniaturas Seletoras (As 3 Fotos Reais) */}
            <div className="grid grid-cols-3 gap-3">
              {fotosGaleria.map((item, idx) => {
                const ativo = fotoAtiva === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFotoAtiva(idx)}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all p-0.5 text-left group ${
                      ativo 
                        ? 'border-blue-600 ring-4 ring-blue-500/20 shadow-lg scale-[1.02]' 
                        : 'border-slate-200/90 opacity-75 hover:opacity-100 hover:border-blue-300'
                    }`}
                  >
                    <img 
                      src={item.src} 
                      alt={item.titulo} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-2 right-1 text-[10px] font-black text-white truncate block">
                      {item.tag}
                    </span>
                    {ativo && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 text-center font-medium pt-1">
              📸 Fotos reais de instalações realizadas pela equipe técnica da <strong>JHS Climatizar</strong>.
            </p>
          </div>

          {/* Coluna da Direita: Diferenciais Técnicos, Benefícios e Contratação */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Lista de Vantagens e Especificações Técnicas */}
            <div className="space-y-3.5">
              
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-lg mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    INSTALAÇÃO SEGURA & DENTRO DA NORMA
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Execução com profissional qualificado (<strong>NR-10 & NBR 5410</strong>). Quadro elétrico dedicado com disjuntor bipolar/tripolar curva C, DR para proteção contra choques e DPS contra surtos na rede.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-lg mt-0.5">
                  <Zap className="w-5 h-5 text-amber-600 fill-amber-600" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    CARREGAMENTO EFICIENTE & SEM QUEDA DE TENSÃO
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Dimensionamento correto de cabos 100% cobre para cargas contínuas de <strong>7,4 kW a 22 kW</strong>. Recarga sem superaquecimento de fiação e sem desarmar outros aparelhos da casa.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-lg mt-0.5">
                  <Home className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    SOLUÇÕES RESIDENCIAIS E EMPRESARIAIS
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Adequado para garagens de casas, vagas em condomínios fechados (com infraestrutura para medição) e estacionamentos corporativos com eletroduto de alta durabilidade.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-lg mt-0.5">
                  <Wrench className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    SUPORTE E ORIENTAÇÃO COMPLETA
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Consultoria na escolha da melhor potência, vistoria da carga disponível, montagem do painel e testes práticos de carregamento com o veículo no local.
                  </p>
                </div>
              </div>

            </div>

            {/* Badges de Destaque */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full font-black text-xs uppercase tracking-wide shadow-md flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4" />
                Seu carro elétrico sempre carregado!
              </div>
              <div className="bg-white border-2 border-blue-600 text-blue-700 px-4 py-2 rounded-full font-black text-xs uppercase tracking-wide shadow-sm flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                Tecnologia e conforto ao seu alcance!
              </div>
            </div>

            {/* Marcas Compatíveis */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Compatibilidade com todas as montadoras e carregadores:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {marcasCompativeis.map((marca) => (
                  <span 
                    key={marca} 
                    className="text-xs font-extrabold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs"
                  >
                    {marca}
                  </span>
                ))}
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                  + Padrão Conector Tipo 2 (Europeu/Brasil)
                </span>
              </div>
            </div>

            {/* Botões de Ação (WhatsApp + Orçamento no Site) */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
              <a 
                href="https://wa.me/5519992327227?text=Ol%C3%A1%20Rodrigo!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20instala%C3%A7%C3%A3o%20de%20carregador%20Wallbox%20para%20carro%20el%C3%A9trico." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-black py-4 px-8 rounded-full transition-all shadow-lg shadow-emerald-600/30 hover:scale-105"
              >
                <Phone className="w-5 h-5 fill-white" />
                (19) 99232-7227 • Rodrigo
              </a>

              <a 
                href="#orcamento"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-bold py-4 px-6 rounded-full transition-all shadow-md hover:scale-105"
              >
                Pedir Orçamento Online
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Modal / Lightbox para Ampliação da Foto */}
      {modalZoom && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalZoom(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[80vh] flex items-center justify-center bg-slate-950">
              <img 
                src={fotosGaleria[fotoAtiva].src} 
                alt={fotosGaleria[fotoAtiva].titulo}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
              <button
                onClick={() => setModalZoom(false)}
                className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-800 text-white p-2.5 rounded-full border border-slate-700 shadow-xl transition-transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  {fotosGaleria[fotoAtiva].tag} • {fotosGaleria[fotoAtiva].badge}
                </span>
                <h4 className="text-lg font-black text-white">{fotosGaleria[fotoAtiva].titulo}</h4>
                <p className="text-xs text-slate-300 mt-1">{fotosGaleria[fotoAtiva].desc}</p>
              </div>
              <a 
                href="https://wa.me/5519992327227?text=Ol%C3%A1%20Rodrigo!%20Vi%20as%20fotos%20da%20instala%C3%A7%C3%A3o%20do%20Wallbox%20no%20site%20e%20gostaria%20de%20um%20or%C3%A7amento."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-5 rounded-full flex items-center gap-2 whitespace-nowrap shadow-md"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
                Orçar esta instalação
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WallboxSection;
