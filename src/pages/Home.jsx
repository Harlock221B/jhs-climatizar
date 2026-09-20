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
  MapPin
} from 'lucide-react';
import { solicitarOrcamentoViaSite } from '../services/db';

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-180 transition-transform duration-700 shadow-md shadow-blue-600/20">
            <Snowflake className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            JHS<span className="text-blue-600">Climatizar</span>
          </h1>
        </a>
        
        <div className="hidden lg:flex gap-7 items-center bg-white/70 backdrop-blur-md px-7 py-3 rounded-full border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <a href="#servicos" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Serviços</a>
          <a href="#orcamento" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Orçamento Online
          </a>
          <a href="#sobre" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Sobre Nós</a>
          <a href="#localizacao" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Localização</a>
          <a href="#depoimentos" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Depoimentos</a>
          <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Dúvidas</a>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href={WHATSAPP_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-full transition-all duration-300 shadow-md shadow-emerald-600/20"
          >
            <Phone className="w-3.5 h-3.5" />
            WhatsApp
          </a>

          {/* Botão Entrar no Sistema */}
          <a 
            href="/login"
            className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold py-2.5 px-4 rounded-full transition-all duration-300 shadow-md shadow-slate-950/20 group"
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#F8FAFC]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-200/40 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full py-12">
        
        <div className="flex flex-col items-start space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-xs tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Monte Mor, Hortolândia e Região
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            O clima perfeito, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              sem estresse.
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed">
            Instalação, manutenção preventiva e higienização de ar-condicionado feitas com padrão de excelência pela equipe da <strong className="text-slate-900">JHS Climatizar</strong>. Esqueça vazamentos e obras mal feitas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#orcamento"
              className="group inline-flex items-center justify-center gap-3 bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] transition-all duration-300 hover:-translate-y-1"
            >
              Pedir Orçamento Online
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold text-lg py-4 px-8 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              WhatsApp Direto
            </a>
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-slate-200 w-full max-w-md">
            <div className="flex -space-x-4">
               {[1,2,3,4].map((i) => (
                 <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Cliente" className="w-12 h-12 rounded-full border-4 border-[#F8FAFC] shadow-sm" />
               ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-bold text-slate-900">5.0 de 5.0</span>
              <span className="text-xs text-slate-500">+500 lares climatizados</span>
            </div>
          </div>
        </div>

        {/* Imagem Desruptiva do Hero */}
        <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-blue-600 mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-700 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1200" 
            alt="Equipe Técnica Especialista JHS Climatizar" 
            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
          />
          
          {/* Floating Badges */}
          <div className="absolute top-8 -left-4 lg:left-8 z-20 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="bg-green-100 p-3 rounded-full">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Garantia de</p>
              <p className="text-sm font-extrabold text-slate-900">Serviço Limpo</p>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-20 bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <ThermometerSnowflake className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white">Gela de Verdade</p>
              <p className="text-xs text-blue-200">Sem vazamentos</p>
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
      icone: <Wrench className="w-8 h-8 text-blue-600" />, 
      desc: 'Medição precisa, uso de tubulação 100% cobre, aplicação de vácuo profundo e acabamento estético que valoriza o seu ambiente.' 
    },
    { 
      titulo: 'Manutenção Corretiva', 
      icone: <Settings className="w-8 h-8 text-blue-600" />, 
      desc: 'Seu ar parou de gelar, está pingando ou fazendo barulho? Identifico o problema na raiz e resolvo com peças de qualidade.' 
    },
    { 
      titulo: 'Limpeza Profunda', 
      icone: <Droplets className="w-8 h-8 text-cyan-500" />, 
      desc: 'Desmontagem técnica para remoção completa de fungos e crostas de sujeira. Seu aparelho gela mais e gasta menos energia.' 
    },
    { 
      titulo: 'Higienização Anvisa', 
      icone: <Sparkles className="w-8 h-8 text-cyan-500" />, 
      desc: 'Aplicação de bactericidas profissionais. Elimina odores ruins e protege a saúde respiratória da sua família contra ácaros e bactérias.' 
    },
  ];

  return (
    <section id="servicos" className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Especialidades</span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              A solução definitiva para o seu equipamento.
            </h3>
          </div>
          <p className="text-slate-500 text-lg max-w-md">
            Do projeto à manutenção anual, a JHS oferece um cuidado clínico para o seu ar-condicionado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicos.map((servico, index) => (
            <div 
              key={index} 
              className="group bg-[#F8FAFC] p-8 rounded-[2rem] hover:bg-slate-900 transition-colors duration-500 flex flex-col h-full"
            >
              <div className="bg-white group-hover:bg-slate-800 p-4 rounded-2xl w-fit shadow-sm mb-8 transition-colors duration-500">
                {servico.icone}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors duration-500">
                {servico.titulo}
              </h4>
              <p className="text-slate-600 group-hover:text-slate-400 leading-relaxed text-sm flex-grow mb-8 transition-colors duration-500">
                {servico.desc}
              </p>
              <a 
                href={WHATSAPP_LINK}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 group-hover:text-cyan-400 font-bold text-sm uppercase tracking-wide mt-auto transition-colors duration-500"
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
                    onChange={(e) => setFormData({...formData, servico: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  >
                    <option value="Instalação Nova">Instalação Nova</option>
                    <option value="Manutenção / Reparo">Manutenção / Reparo</option>
                    <option value="Limpeza Profunda">Limpeza Profunda</option>
                    <option value="Higienização Bactericida">Higienização Bactericida</option>
                    <option value="Desinstalação / Mudança">Desinstalação / Mudança</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Qtd de Aparelhos
                  </label>
                  <select 
                    value={formData.aparelhos}
                    onChange={(e) => setFormData({...formData, aparelhos: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  >
                    <option value="1 aparelho">1 aparelho</option>
                    <option value="2 aparelhos">2 aparelhos</option>
                    <option value="3 aparelhos">3 aparelhos</option>
                    <option value="4 ou mais">4 ou mais aparelhos</option>
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
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800" 
              alt="JHS Climatizar - Empresa de Climatização" 
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          </div>
          {/* Badge de Experiência */}
          <div className="absolute -bottom-8 -right-8 bg-blue-600 rounded-[2rem] p-8 shadow-2xl border-4 border-slate-900">
            <Wind className="w-10 h-10 text-white mb-2" />
            <p className="text-4xl font-extrabold text-white">Anos</p>
            <p className="text-blue-200 font-medium">de experiência no setor</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 block">Sobre a JHS Climatizar</span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Excelência, conforto térmico e honestidade.
            </h3>
          </div>
          
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              A <strong>JHS Climatizar</strong> é uma empresa consolidada na prestação de serviços de instalação, manutenção corretiva, planos preventivos e higienização bactericida de aparelhos de ar-condicionado.
            </p>
            <p>
              Nosso objetivo é simples: <strong>entregar tranquilidade e o clima perfeito para sua residência ou empresa</strong>, sem poeira espalhada, sem gambiarras e com garantia real documentada.
            </p>
            <p className="text-base text-slate-400">
              Utilizamos tubulação 100% em cobre, teste de estanqueidade contra vazamentos e bomba de vácuo em todos os procedimentos, preservando a vida útil e a economia de energia do seu equipamento.
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
    { nome: 'Monte Mor - SP', principal: true, desc: 'Sede Operacional & Atendimento Prioritário' },
    { nome: 'Hortolândia - SP', principal: false, desc: 'Atendimento rápido e equipe técnica dedicada' },
    { nome: 'Campinas - SP', principal: false, desc: 'Cobertura em residências, clínicas e comércios' },
    { nome: 'Sumaré - SP', principal: false, desc: 'Atendimento ágil e orçamentos sem custo' },
    { nome: 'Paulínia - SP', principal: false, desc: 'Instalação de splits e manutenções preventivas' },
    { nome: 'Nova Odessa & Americana', principal: false, desc: 'Atendimento em condomínios e empresas' },
  ];

  return (
    <section id="localizacao" className="py-24 bg-white px-6 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3 block">Presença Regional</span>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Localização & Regiões Atendidas
          </h3>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mt-4">
            Com sede em <strong>Monte Mor - SP</strong>, a JHS Climatizar atende com agilidade toda a Região Metropolitana de Campinas (RMC) e cidades vizinhas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cidades.map((cidade, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl border transition-all flex items-start gap-4 ${
                cidade.principal 
                  ? 'border-blue-300 bg-blue-50/40 shadow-sm' 
                  : 'border-slate-200 bg-slate-50/40 hover:bg-white hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div className={`p-3 rounded-xl shrink-0 ${cidade.principal ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-base">{cidade.nome}</h4>
                  {cidade.principal && (
                    <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      Sede
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{cidade.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 md:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-base">Deslocamento Rápido e Orçamento Ágil</h5>
              <p className="text-slate-400 text-xs mt-0.5">Veículos equipados com ferramentas de precisão e materiais de primeira linha.</p>
            </div>
          </div>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-7 rounded-full text-sm transition-all whitespace-nowrap shadow-lg shadow-blue-600/40 hover:scale-105"
          >
            Consultar Atendimento
          </a>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const avaliacoes = [
    {
      nome: "Carlos Silva",
      papel: "Residência",
      texto: "Serviço impecável. A equipe da JHS instalou dois aparelhos em casa, não sujaram nada, usaram aspirador durante o furo e deixaram gelando perfeitamente.",
    },
    {
      nome: "Mariana Costa",
      papel: "Clínica de Estética",
      texto: "Estávamos perdendo clientes pelo calor. A equipe da JHS veio no mesmo dia, achou o vazamento, recarregou o gás e salvou a nossa semana. Recomendo de olhos fechados.",
    },
    {
      nome: "Roberto Mendes",
      papel: "Escritório Comercial",
      texto: "Fechamos contrato de manutenção preventiva com a JHS. Acabou o problema de aparelho pingando água nas mesas e cheiro de mofo. Profissionalismo raro.",
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {av.nome.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">{av.nome}</h5>
                  <span className="text-sm text-slate-500">{av.papel}</span>
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
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Snowflake className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            JHS<span className="text-blue-500">Climatizar</span>
          </h2>
        </div>
        <p className="text-slate-400 font-medium">
          Monte Mor - SP • Campinas e Região
        </p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
        <p>© {new Date().getFullYear()} JHS Climatizar. Todos os direitos reservados.</p>
        <a 
          href="/login" 
          className="text-slate-600 hover:text-slate-400 text-xs flex items-center gap-1 transition-colors"
        >
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