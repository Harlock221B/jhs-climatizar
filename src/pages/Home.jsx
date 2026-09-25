import React, { useState, useEffect } from 'react';
import { 
  Snowflake, 
  Wrench, 
  Settings, 
  Droplets, 
  Sparkles, 
  MessageCircle, 
  Instagram, 
  CreditCard, 
  Phone, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Wind,
  Lock,
  Send,
  Check,
  Loader2,
  Calculator,
  MapPin,
  Camera,
  Zap
} from 'lucide-react';
import { solicitarOrcamentoViaSite } from '../services/db';
import { WallboxSection } from '../components/WallboxSection';
import logoIcon from '../assets/icon/icon.png';
import logoIconeSite from '../assets/icon/icone_site.jpg';
import fotoRodrigo1 from '../assets/img/rodrigo-1.png';
import fotoRodrigo2 from '../assets/img/rodrigo-2.png';
import fotoRodrigo3 from '../assets/img/rodrigo-3.jpeg';
import fotoRodrigo4 from '../assets/img/rodrigo-4.jpeg';
import fotoRodrigo5 from '../assets/img/rodrigo-5.png';
import fotoRodrigo6 from '../assets/img/rodrigo-6.png';
import fotoWallboxReal from '../assets/img/wallbox-1.png';

const AVATAR_PROFILES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
];

const WHATSAPP_NUMBER = "5519992327227";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento para ar-condicionado com a equipe da JHS Climatizar.`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] py-3.5 border-b border-slate-100/80' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-2xl overflow-hidden p-1 bg-white border border-slate-200/80 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all flex items-center justify-center">
            <img src={logoIcon} alt="JHS Climatizar Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              JHS<span className="text-blue-600">Climatizar</span>
            </h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
              Monte Mor • RMC
            </span>
          </div>
        </a>
        
        <div className="hidden lg:flex gap-5 items-center bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <a href="#servicos" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Serviços</a>
          <a href="#wallbox" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Wallbox
          </a>
          <a href="#processo" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Como Funciona
          </a>
          <a href="#galeria" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-blue-600" /> Fotos Reais
          </a>
          <a href="#orcamento" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Orçamento Online
          </a>
          <a href="#sobre" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Sobre Nós</a>
          <a href="#depoimentos" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Depoimentos</a>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href={WHATSAPP_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-full transition-all duration-300 shadow-md shadow-emerald-600/20 hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5" />
            WhatsApp
          </a>

          {/* Botão Entrar no Sistema */}
          <a 
            href="/login"
            className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold py-2.5 px-4 rounded-full transition-all duration-300 shadow-md shadow-slate-950/20 group hover:scale-105"
            title="Acesso restrito à equipe técnica JHS Climatizar"
          >
            <Lock className="w-3.5 h-3.5 text-blue-400 group-hover:text-white transition-colors" />
            <span>Entrar no Sistema</span>
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-white">
      {/* Background Organic Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[15%] -right-[10%] w-[55%] h-[55%] rounded-full bg-blue-300/30 blur-[140px]" />
        <div className="absolute top-[35%] -left-[10%] w-[45%] h-[45%] rounded-full bg-cyan-200/30 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        
        <div className="flex flex-col items-start space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/90 border border-blue-200/60 text-blue-700 font-bold text-xs tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Atendimento Rápido em Monte Mor e Região
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight">
            O clima perfeito, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
              sem dor de cabeça.
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed font-normal">
            Instalação com padrão técnico, vácuo profundo e tubulação 100% cobre pela equipe da <strong className="text-slate-900 font-bold">JHS Climatizar</strong>. Esqueça vazamentos e obras malfeitas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#orcamento"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base py-4 px-8 rounded-full shadow-[0_12px_30px_-8px_rgba(37,99,235,0.45)] hover:shadow-[0_16px_36px_-6px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Pedir Orçamento Online
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white/90 backdrop-blur-md text-slate-800 font-bold text-base py-4 px-8 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 shadow-sm"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              WhatsApp Direto
            </a>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-slate-200/80 w-full max-w-md">
            <div className="flex -space-x-4">
               {AVATAR_PROFILES.map((src, i) => (
                 <img key={i} src={src} alt="Cliente Satisfeito JHS Climatizar" className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" />
               ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-bold text-slate-900">5.0 de 5.0 estrelas</span>
              <span className="text-xs text-slate-500 font-medium">+500 clientes atendidos com nota máxima</span>
            </div>
          </div>
        </div>

        {/* Imagem Real do Hero com Moldura Orgânica */}
        <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl border-4 border-white bg-slate-950">
          <img 
            src={fotoRodrigo6} 
            alt="Rodrigo - Especialista JHS Climatizar com Certificação NR-35 em Instalação Externa" 
            className="w-full h-full object-cover object-[50%_15%] transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
          
          {/* Floating Badges Orgânicos */}
          <div className="absolute top-6 left-4 sm:left-6 z-20 bg-white/90 backdrop-blur-xl p-3.5 pr-5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/80">
            <img 
              src={fotoRodrigo1} 
              alt="Rodrigo - Responsável Técnico" 
              className="w-12 h-12 rounded-xl object-cover object-[50%_20%] border-2 border-blue-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-xs font-black text-slate-900">Rodrigo • Responsável Técnico</p>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Atendimento Direto em Monte Mor e RMC</p>
            </div>
          </div>

          <div className="absolute bottom-6 right-4 sm:right-6 z-20 bg-slate-900/90 backdrop-blur-xl px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700/60">
            <div className="bg-blue-500/20 p-2.5 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white">Certificado NR-35 & NR-10</p>
              <p className="text-xs text-blue-200">Segurança Total & 100% Cobre</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Services = () => {
  const servicos = [
    { 
      titulo: 'Instalação Premium', 
      tag: '100% Cobre & Vácuo',
      fotoProcesso: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      icone: <Wrench className="w-4 h-4 text-blue-600" />, 
      desc: 'Medição a laser, furação com aspirador acoplado, uso estrito de tubulação 100% cobre e acabamento milimétrico que respeita a estética do seu cômodo.' 
    },
    { 
      titulo: 'Manutenção Corretiva', 
      tag: 'Diagnóstico & Reparo',
      fotoProcesso: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      icone: <Settings className="w-4 h-4 text-blue-600" />, 
      desc: 'Ar parou de gelar, está vazando água ou emitindo ruídos? Teste de sensores, capacitores, placas inverter e recarga precisa de fluído refrigerante.' 
    },
    { 
      titulo: 'Limpeza Profunda', 
      tag: 'Lavagem sob Pressão',
      fotoProcesso: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      icone: <Droplets className="w-4 h-4 text-cyan-500" />, 
      desc: 'Desmontagem técnica da carenagem plástica e aplicação de máquina de pressão com bolsa impermeável vedada. Remoção física de fungos e crostas.' 
    },
    { 
      titulo: 'Higienização Anvisa', 
      tag: 'Bactericida Hospitalar',
      fotoProcesso: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      icone: <Sparkles className="w-4 h-4 text-cyan-500" />, 
      desc: 'Aplicação de sanitizantes e desinfetantes homologados. Elimina ácaros, bactérias e odores desagradáveis, purificando o ar para sua família.' 
    },
  ];

  return (
    <section id="servicos" className="py-28 bg-white px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-full">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              Especialidades Técnicas
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              A solução definitiva para o seu equipamento.
            </h3>
          </div>
          <p className="text-slate-500 text-base sm:text-lg max-w-md leading-relaxed">
            Do projeto à manutenção periódica, a JHS Climatizar oferece um cuidado clínico e profissional para o seu ar-condicionado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicos.map((servico, index) => (
            <div 
              key={index} 
              className="group bg-white p-6 sm:p-7 rounded-[2.5rem] border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-10px_rgba(37,99,235,0.12)] hover:-translate-y-2 hover:border-blue-300 transition-all duration-500 flex flex-col h-full"
            >
              {/* Imagem do Processo */}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
                <img 
                  src={servico.fotoProcesso} 
                  alt={servico.titulo} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 flex items-center gap-1.5 shadow-sm border border-slate-100">
                  {servico.icone}
                  <span>{servico.tag}</span>
                </div>
              </div>

              <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {servico.titulo}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm flex-grow mb-6">
                {servico.desc}
              </p>
              <a 
                href={WHATSAPP_LINK}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm uppercase tracking-wide mt-auto transition-colors"
              >
                Solicitar orçamento <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const etapas = [
    {
      numero: '01',
      titulo: 'Diagnóstico & Orçamento Rápido',
      sub: 'Sem enrolação',
      desc: 'Você nos chama pelo WhatsApp ou formulário. Analisamos o tamanho do cômodo, marca e necessidade para enviar uma proposta clara e transparente.',
      icone: <MessageCircle className="w-6 h-6 text-blue-600" />,
      badge: 'Atendimento Ágil'
    },
    {
      numero: '02',
      titulo: 'Planejamento 100% Cobre',
      sub: 'Sem alumínio',
      desc: 'Cálculo exato de carga térmica (BTUs) e especificação técnica estrita de tubulação de cobre e cabeamento de força dimensionado.',
      icone: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      badge: 'Padrão Fabricante'
    },
    {
      numero: '03',
      titulo: 'Execução Limpa & Vácuo Técnico',
      sub: 'Zero poeira',
      desc: 'Furação diamantada com aspirador acoplado para não sujar sua casa, flangeamento perfeito e vácuo profundo com bomba e manifold.',
      icone: <Wrench className="w-6 h-6 text-cyan-600" />,
      badge: 'Cuidado com sua Casa'
    },
    {
      numero: '04',
      titulo: 'Aferição a 16°C & Garantia Escrita',
      sub: 'Comprovação Real',
      desc: 'Medição da temperatura na saída do evaporador na sua frente e entrega de certificado de garantia documentado pela JHS.',
      icone: <ThermometerSnowflake className="w-6 h-6 text-indigo-600" />,
      badge: 'Garantia Documentada'
    }
  ];

  return (
    <section id="processo" className="py-28 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 px-6 relative overflow-hidden">
      {/* Elementos orgânicos de fundo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 border border-blue-200/80 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Método de Atendimento JHS
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Como funciona o atendimento da JHS Climatizar na prática.
          </h3>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Do primeiro "olá" no WhatsApp até a entrega do aparelho gelando no limite máximo com garantia documentada. Processo transparente e sem surpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {etapas.map((etapa, idx) => (
            <div 
              key={idx}
              className="group relative bg-white/90 backdrop-blur-sm p-7 rounded-[2.5rem] border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] hover:-translate-y-2 hover:border-blue-300 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300 shadow-sm">
                    {etapa.icone}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-500/30 transition-colors duration-300">
                    {etapa.numero}
                  </span>
                </div>

                <span className="inline-block text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full mb-2">
                  {etapa.badge}
                </span>

                <h4 className="text-lg font-black text-slate-900 mb-2 leading-snug">
                  {etapa.titulo}
                </h4>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {etapa.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Passo {etapa.numero} de 04</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Garantia no fim do processo */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2rem] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-extrabold text-base sm:text-lg">Garantia por Escrito em Todo Serviço</h5>
              <p className="text-blue-100 text-xs sm:text-sm">Tranquilidade e segurança com suporte direto do técnico Rodrigo.</p>
            </div>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 hover:bg-blue-50 font-black text-sm py-3 px-6 rounded-full shadow-md transition-all hover:scale-105 whitespace-nowrap"
          >
            Iniciar Meu Atendimento
          </a>
        </div>
      </div>
    </section>
  );
};

const RealWorkGallery = () => {
  const fotosReais = [
    {
      foto: fotoRodrigo5,
      titulo: 'Higienização Química com Coletor',
      subtitulo: 'Evaporadora Residencial',
      badge: 'Lavagem sob Pressão',
      desc: 'Desmontagem técnica, isolamento com bolsa impermeável vedada e lavagem sob pressão com bactericida. Zero respingos no piso e ar puro para sua família.',
      icone: <Droplets className="w-4 h-4 text-cyan-400" />
    },
    {
      foto: fotoRodrigo4,
      titulo: 'Vácuo Técnico & Manifold',
      subtitulo: 'Condensadora Externa',
      badge: 'Pressão & Estanqueidade',
      desc: 'Aplicação de bomba de vácuo profundo e manômetro manifold para teste rigoroso de estanqueidade. Gás preservado e máxima durabilidade do compressor.',
      icone: <Settings className="w-4 h-4 text-blue-400" />
    },
    {
      foto: fotoRodrigo6,
      titulo: 'Instalação em Altura (NR-35)',
      subtitulo: 'Coberturas & Telhados',
      badge: 'Segurança & EPI Completo',
      desc: 'Trabalho em telhados e fachadas com capacete, cinto paraquedista, trava-quedas e ancoragem certificada. Cuidado com o telhado e segurança patrimonial.',
      icone: <ShieldCheck className="w-4 h-4 text-amber-400" />
    },
    {
      foto: fotoRodrigo3,
      titulo: 'Aferição Digital a 16°C',
      subtitulo: 'Samsung WindFree',
      badge: 'Teste de Rendimento',
      desc: 'Medição com sensor de temperatura e anemômetro direto na saída de ar atingindo 16°C. Comprovação científica de rendimento térmico no ato da entrega.',
      icone: <ThermometerSnowflake className="w-4 h-4 text-emerald-400" />
    },
    {
      foto: fotoWallboxReal,
      titulo: 'Instalação de Painel Wallbox',
      subtitulo: 'GWM & Intelbras',
      badge: 'Eletromobilidade & NR-10',
      desc: 'Quadro elétrico dedicado com disjuntores, DPS e eletroduto galvanizado para carregamento seguro e eficiente de veículos elétricos e híbridos.',
      icone: <Zap className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <section id="galeria" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/60">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs mb-3 bg-cyan-950/80 border border-cyan-800/80 px-3.5 py-1.5 rounded-full">
                <Camera className="w-3.5 h-3.5" />
                Galeria de Trabalhos Reais
              </span>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                O trabalho real de quem entende <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  de climatização na prática.
                </span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed">
              Nada de fotos genéricas de banco de imagens. Aqui você confere o padrão técnico executado pelo Rodrigo e equipe da JHS Climatizar em residências e empresas de Monte Mor e região.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {fotosReais.map((item, idx) => (
              <div 
                key={idx}
                className="group bg-slate-900/90 backdrop-blur-md rounded-[2rem] overflow-hidden border border-slate-800/80 hover:border-blue-500/60 shadow-xl transition-all duration-500 flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                  <img 
                    src={item.foto} 
                    alt={item.titulo} 
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-3.5 left-3.5 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/80 flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
                    {item.icone}
                    <span>{item.badge}</span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                      {item.subtitulo}
                    </span>
                    <h4 className="text-base font-black text-white leading-snug">
                      {item.titulo}
                    </h4>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between bg-slate-900/60">
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-cyan-300 transition-colors"
                  >
                    <span>Agendar atendimento</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const QuoteRequestSection = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cidade: 'Monte Mor',
    servico: 'Instalação Nova',
    aparelhos: '1 aparelho',
    detalhes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.telefone.trim()) return;

    setLoading(true);
    try {
      await solicitarOrcamentoViaSite(formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao solicitar:", err);
      alert("Não foi possível enviar pelo formulário. Favor nos chamar diretamente pelo WhatsApp!");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMsg = `Olá! Enviei uma solicitação pelo site da JHS Climatizar:\n*Nome:* ${formData.nome}\n*WhatsApp:* ${formData.telefone}\n*Cidade:* ${formData.cidade}\n*Serviço:* ${formData.servico}\n*Aparelhos:* ${formData.aparelhos}\n*Detalhes:* ${formData.detalhes || 'Sem observações'}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section id="orcamento" className="py-24 bg-gradient-to-b from-white via-blue-50/40 to-slate-50 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/30 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            Orçamento Online Sem Compromisso
          </span>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Deixe sua solicitação de orçamento
          </h3>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mt-4">
            Preencha os dados abaixo em menos de 1 minuto. Nossa equipe técnica analisará sua necessidade e responderá com o orçamento detalhado e disponibilidade!
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] shadow-xl p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-2xl font-extrabold text-slate-900">Solicitação Enviada com Sucesso!</h4>
                <p className="text-slate-600 text-sm">
                  Obrigado, <strong>{formData.nome}</strong>! Seus dados foram registrados com sucesso no sistema da JHS Climatizar.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Agilizar Resposta no WhatsApp
                </a>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nome: '',
                      telefone: '',
                      cidade: 'Monte Mor',
                      servico: 'Instalação Nova',
                      aparelhos: '1 aparelho',
                      detalhes: ''
                    });
                  }}
                  className="text-slate-500 hover:text-slate-800 text-sm font-semibold py-3 px-6"
                >
                  Enviar outra solicitação
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Seu Nome Completo *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Ex: Carlos Eduardo Silva"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Seu WhatsApp / Telefone com DDD *
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    placeholder="(19) 99999-9999"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Cidade / Bairro
                  </label>
                  <input 
                    type="text" 
                    value={formData.cidade}
                    onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                    placeholder="Ex: Monte Mor (Centro), Hortolândia..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Tipo de Serviço
                  </label>
                  <select 
                    value={formData.servico}
                    onChange={(e) => {
                      const novoServico = e.target.value;
                      setFormData(prev => ({
                        ...prev, 
                        servico: novoServico,
                        aparelhos: novoServico.includes('Wallbox') ? '1 carregador Wallbox' : (prev.aparelhos.includes('Wallbox') ? '1 aparelho' : prev.aparelhos)
                      }));
                    }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  >
                    <option value="Instalação Nova">Instalação Nova de Ar-Condicionado</option>
                    <option value="Instalação de Wallbox (Carro Elétrico)">⚡ Instalação de Painel para Carro Elétrico (Wallbox)</option>
                    <option value="Manutenção / Reparo">Manutenção / Reparo</option>
                    <option value="Limpeza Profunda">Limpeza Profunda</option>
                    <option value="Higienização Bactericida">Higienização Bactericida</option>
                    <option value="Desinstalação / Mudança">Desinstalação / Mudança</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {formData.servico.includes('Wallbox') ? 'Qtd de Carregadores' : 'Qtd de Aparelhos'}
                  </label>
                  <select 
                    value={formData.aparelhos}
                    onChange={(e) => setFormData({...formData, aparelhos: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  >
                    {formData.servico.includes('Wallbox') ? (
                      <>
                        <option value="1 carregador Wallbox">1 carregador Wallbox</option>
                        <option value="2 carregadores Wallbox">2 carregadores Wallbox</option>
                        <option value="3 ou mais (Condomínio / Frota)">3 ou mais (Condomínio / Frota)</option>
                        <option value="Ponto dedicado 20A / 32A">Ponto dedicado 20A / 32A</option>
                      </>
                    ) : (
                      <>
                        <option value="1 aparelho">1 aparelho</option>
                        <option value="2 aparelhos">2 aparelhos</option>
                        <option value="3 aparelhos">3 aparelhos</option>
                        <option value="4 ou mais">4 ou mais aparelhos</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Observações ou Detalhes (Opcional)
                </label>
                <textarea 
                  rows="3"
                  value={formData.detalhes}
                  onChange={(e) => setFormData({...formData, detalhes: e.target.value})}
                  placeholder="Ex: É apartamento no 3º andar, aparelho de 12.000 BTUs da marca LG, precisa furar parede, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Seus dados estão protegidos e não serão compartilhados.
                </p>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando solicitação...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Solicitar Orçamento Grátis</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-32 bg-slate-900 text-white px-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-[100px]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950 relative group">
            <img 
              src={fotoRodrigo1} 
              alt="Rodrigo - Fundador e Responsável Técnico da JHS Climatizar" 
              className="w-full h-full object-cover object-[50%_15%] group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />

            {/* Profile Card do Fundador */}
            <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-white">Rodrigo</h4>
                  <p className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider">Fundador & Responsável Técnico</p>
                </div>
                <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" title="Atendimento direto com o especialista" />
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" /> NR-35 (Altura)
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" /> NR-10 (Elétrica)
                </span>
                <span className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> 100% Cobre
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Monte Mor - SP
                </span>
              </div>
            </div>
          </div>

          {/* Selo Flutuante de Confiança */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl border-2 border-white/20 hidden sm:flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Atendimento Direto</p>
              <p className="text-xs sm:text-sm font-extrabold">Sem Terceirização</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 block">Sobre a JHS Climatizar</span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Excelência, conforto térmico e honestidade.
            </h3>
          </div>
          
          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              A <strong>JHS Climatizar</strong> é uma empresa sediada em <strong>Monte Mor - SP</strong>, liderada pelo especialista técnico <strong>Rodrigo</strong>, com atuação de destaque em toda a Região Metropolitana de Campinas (RMC).
            </p>
            <p>
              Nosso compromisso inegociável é: <strong>entregar tranquilidade e climatização de verdade para sua residência ou empresa</strong>, sem poeira espalhada, sem gambiarras e com garantia real documentada em cada serviço.
            </p>
            <p className="text-sm sm:text-base text-slate-400">
              Trabalhamos exclusivamente com tubulação 100% de cobre, vácuo profundo aferido, teste de estanqueidade contra vazamentos e materiais de primeira linha, assegurando o menor consumo elétrico e a máxima vida útil do seu ar-condicionado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
            {[
              'Tubulação 100% Cobre',
              'Vácuo Obrigatório no Sistema',
              'Limpeza Pós-Obra Impecável',
              'Garantia Escrita de Serviço',
              'Equipe Técnica Certificada',
              'Atendimento Residencial e Comercial'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="font-semibold text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const LocationSection = () => {
  const cidades = [
    { nome: 'Monte Mor - SP', principal: true, desc: 'Sede Operacional & Atendimento Prioritário com resposta rápida' },
    { nome: 'Hortolândia - SP', principal: false, desc: 'Atendimento diário com equipe técnica e deslocamento ágil' },
    { nome: 'Campinas - SP', principal: false, desc: 'Cobertura em residências, clínicas, consultórios e escritórios' },
    { nome: 'Sumaré - SP', principal: false, desc: 'Atendimento rápido e orçamentos detalhados sem compromisso' },
    { nome: 'Paulínia - SP', principal: false, desc: 'Instalação de splits novos e contratos de manutenção preventiva' },
    { nome: 'Nova Odessa & Americana', principal: false, desc: 'Atendimento especializado em condomínios e estabelecimentos' },
  ];

  return (
    <section id="localizacao" className="py-28 bg-gradient-to-b from-white to-slate-50/80 px-6 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 border border-blue-200/80 font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Presença Regional
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Localização & Regiões Atendidas
          </h3>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Com sede operacional em <strong className="text-slate-900">Monte Mor - SP</strong>, a JHS Climatizar atende prontamente condomínios, residências e empresas de toda a Região Metropolitana de Campinas (RMC).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cidades.map((cidade, i) => (
            <div 
              key={i} 
              className={`p-7 rounded-[2rem] border transition-all duration-300 flex items-start gap-4 ${
                cidade.principal 
                  ? 'border-blue-300 bg-blue-50/50 shadow-sm hover:shadow-md hover:border-blue-400' 
                  : 'border-slate-200/80 bg-white hover:bg-slate-50/70 hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div className={`p-3.5 rounded-2xl shrink-0 shadow-sm ${cidade.principal ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-slate-900 text-base">{cidade.nome}</h4>
                  {cidade.principal && (
                    <span className="text-[10px] font-black bg-blue-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Sede
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">{cidade.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 md:p-8 rounded-[2.5rem] bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-extrabold text-white text-base">Deslocamento Rápido e Orçamento Sem Custo Oculto</h5>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Veículos equipados com ferramentas de precisão e insumos de primeira linha.</p>
            </div>
          </div>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-7 rounded-full text-sm transition-all whitespace-nowrap shadow-lg shadow-blue-600/40 hover:scale-105"
          >
            Consultar Disponibilidade
          </a>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const avaliacoes = [
    {
      nome: "Carlos Eduardo Silva",
      papel: "Residencial • Monte Mor",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
      texto: "Serviço impecável. A equipe da JHS instalou dois aparelhos em casa, não sujaram nada, usaram aspirador durante o furo e deixaram gelando perfeitamente.",
    },
    {
      nome: "Dra. Mariana Costa",
      papel: "Clínica Odonto & Estética • Hortolândia",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
      texto: "Estávamos perdendo pacientes pelo calor intenso. O Rodrigo veio no mesmo dia, achou o micro-vazamento, recarregou o gás com balança e salvou a nossa semana. Recomendo de olhos fechados.",
    },
    {
      nome: "Roberto Mendes",
      papel: "Diretor Comercial • Campinas",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
      texto: "Fechamos contrato de manutenção preventiva com a JHS para todo o escritório. Acabou o problema de aparelho pingando água nas mesas e cheiro de mofo. Profissionalismo raro no mercado.",
    }
  ];

  return (
    <section id="depoimentos" className="py-32 bg-[#F8FAFC] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Não acredite apenas<br/> nas nossas palavras.
          </h3>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A reputação da JHS é construída com o compromisso de cada serviço bem executado e com o respeito à casa de cada cliente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {avaliacoes.map((av, index) => (
            <div key={index} className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow">
              <div className="flex text-yellow-400 mb-8 gap-1">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10">"{av.texto}"</p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-blue-500 shadow-md">
                  <img src={av.foto} alt={av.nome} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 flex items-center gap-1.5 text-base">
                    {av.nome}
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </h5>
                  <span className="text-xs text-slate-500">{av.papel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      pergunta: "Com qual frequência devo fazer a limpeza do ar-condicionado?",
      resposta: "Recomenda-se a limpeza preventiva a cada 6 meses para residências e a cada 3 meses ou menos para empresas/comércios, dependendo do uso diário."
    },
    {
      pergunta: "Meu ar-condicionado está pingando água para dentro, o que é?",
      resposta: "Geralmente é sujeira entupindo o dreno ou falta de fluído refrigerante (gás) que faz a evaporadora congelar. Uma manutenção corretiva resolve rapidamente sem precisar trocar de aparelho."
    },
    {
      pergunta: "Vocês parcelam os serviços?",
      resposta: "Sim! Aceitamos as principais bandeiras de cartão de crédito e parcelamos para facilitar o seu investimento em conforto."
    },
    {
      pergunta: "O serviço gera muita sujeira ou obra na parede?",
      resposta: "Trabalhamos com perfuração utilizando copo diamantado e aspirador de pó acoplado. A sujeira é reduzida a quase zero. A JHS preza por manter sua casa exatamente como a encontramos."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0); // O primeiro já vem aberto

  return (
    <section id="faq" className="py-32 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Transparência</span>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Perguntas Frequentes
          </h3>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border ${isOpen ? 'border-blue-600 shadow-md' : 'border-slate-200 hover:border-slate-300'} rounded-2xl overflow-hidden transition-all duration-300`}
              >
                <button 
                  className={`w-full px-8 py-6 flex justify-between items-center text-left ${isOpen ? 'bg-blue-50/50' : 'bg-white'}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`font-bold text-lg ${isOpen ? 'text-blue-600' : 'text-slate-900'}`}>{faq.pergunta}</span>
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-48 py-6 opacity-100 border-t border-blue-100' : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 text-lg leading-relaxed">{faq.resposta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto bg-blue-600 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/30 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-800/30 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
            Pronto para resolver <br/> o seu problema?
          </h2>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-12">
            Mande uma mensagem agora. Vamos agendar uma visita técnica, entender sua necessidade e resolver com rapidez e preço justo.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 font-bold text-lg py-5 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <MessageCircle className="w-6 h-6" />
              Falar pelo WhatsApp
            </a>
            <a 
              href="https://instagram.com/RODRIGO_JHSCLIMATIZAR"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg py-5 px-10 rounded-full transition-colors duration-300"
            >
              <Instagram className="w-6 h-6" />
              Ver no Instagram
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              <span className="font-semibold tracking-wider">ACEITAMOS CARTÕES E PIX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-10 mb-10 gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden p-1 bg-white/10 border border-white/10 flex items-center justify-center">
            <img src={logoIcon} alt="JHS Climatizar Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            JHS<span className="text-blue-500">Climatizar</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-400" />
            Monte Mor - SP • Campinas e Região
          </span>
          <a 
            href={WHATSAPP_LINK}
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            (19) 99232-7227
          </a>
          <a 
            href="https://instagram.com/RODRIGO_JHSCLIMATIZAR"
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-slate-300 hover:text-pink-400 transition-colors"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            @RODRIGO_JHSCLIMATIZAR
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
        <p>© {new Date().getFullYear()} JHS Climatizar. Todos os direitos reservados. CNPJ & Garantia Documentada.</p>
        <a 
          href="/login" 
          className="text-slate-600 hover:text-slate-400 text-xs flex items-center gap-1.5 transition-colors font-semibold"
        >
          <Lock className="w-3 h-3 text-slate-500" />
          Área do Profissional
        </a>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#1ebd5a] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-white text-slate-900 text-sm font-bold py-2 px-4 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Tirar Dúvida! 🚀
      </span>
    </a>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-600 selection:text-white scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WallboxSection />
        <ProcessSection />
        <RealWorkGallery />
        <QuoteRequestSection />
        <About />
        <LocationSection />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}