import React from 'react';
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
  CheckCircle2
} from 'lucide-react';

const WHATSAPP_NUMBER = "5519992327227";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá Rodrigo! Gostaria de um orçamento para ar-condicionado.`;

const Navbar = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <Snowflake className="text-blue-600 w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">
            JHS <span className="text-blue-500 font-light">Climatizar</span>
          </h1>
        </div>
        <a 
          href={WHATSAPP_LINK}
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <Phone className="w-4 h-4" />
          Falar com o Rodrigo
        </a>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="text-center lg:text-left">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-wide mb-6">
            ESPECIALISTA EM CLIMATIZAÇÃO
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-blue-950 mb-6 leading-tight">
            O clima perfeito para o seu <span className="text-blue-600">ambiente.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Chega de passar calor ou sofrer com ar-condicionado pingando. Meu compromisso é garantir conforto, saúde e eficiência para sua casa ou empresa com um serviço rápido e honesto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href={WHATSAPP_LINK}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              Fazer Orçamento
            </a>
            <a 
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 border-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg"
            >
              Ver Serviços
            </a>
          </div>
        </div>

        {/* 📸 FOTO 1: Ideal colocar uma foto do Rodrigo sorrindo com uniforme ou realizando um serviço limpo */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800" 
            alt="Rodrigo Souza - JHS Climatizar" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg inline-block">
              <p className="text-blue-950 font-bold flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-5 h-5" /> Atendimento direto com o técnico
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-20 bg-slate-50 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* 📸 FOTO 2: Outra foto do Rodrigo em ação ou da van/ferramentas dele */}
        <div className="order-2 lg:order-1 relative w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-xl">
           <img 
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800" 
            alt="Rodrigo Souza realizando manutenção" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">
            Quem é a JHS Climatizar?
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Olá, sou <strong>Rodrigo Souza</strong>, o técnico especialista por trás da JHS Climatizar. Entendo que o seu ar-condicionado é um investimento para o seu bem-estar. Por isso, faço questão de executar cada serviço com total transparência, pontualidade e capricho em Hortolândia e região.
          </p>
          
          <ul className="space-y-4">
            {[
              'Atendimento direto comigo, sem intermediários.',
              'Profissional capacitado e sempre atualizado.',
              'Uso de materiais de primeira linha (tubulação de cobre, etc).',
              'Limpeza e organização rigorosa no local do serviço.',
              'Diagnóstico honesto: só troco o que realmente precisa.'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

const Services = () => {
  const servicos = [
    { 
      titulo: 'Instalação', 
      icone: <Wrench className="w-10 h-10 text-blue-500" />, 
      desc: 'Dimensionamento correto para o seu ambiente. Instalação com acabamento impecável, vácuo no sistema e testes de pressão para garantir vida longa ao aparelho.' 
    },
    { 
      titulo: 'Manutenção', 
      icone: <Settings className="w-10 h-10 text-blue-500" />, 
      desc: 'Solução para problemas de vazamento, aparelho que não gela, barulhos ou falhas elétricas. Realizo reparos preventivos e corretivos.' 
    },
    { 
      titulo: 'Limpeza', 
      icone: <Droplets className="w-10 h-10 text-blue-500" />, 
      desc: 'Lavagem completa da condensadora e evaporadora. Remoção de crostas de poeira que forçam o motor e aumentam sua conta de energia.' 
    },
    { 
      titulo: 'Higienização', 
      icone: <Sparkles className="w-10 h-10 text-blue-500" />, 
      desc: 'Aplicação de produtos bactericidas aprovados pela Anvisa. Essencial para a saúde respiratória, eliminando ácaros, fungos e bactérias.' 
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
            Meus Serviços
          </h3>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Da instalação à manutenção anual, ofereço a solução completa e cuidadosa para o seu ar-condicionado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicos.map((servico, index) => (
            <div 
              key={index} 
              className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center cursor-default"
            >
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {servico.icone}
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-4">{servico.titulo}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">{servico.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactAndPayments = () => {
  return (
    <section className="bg-blue-950 text-white py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        
        <div className="space-y-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Fale com o Rodrigo</h3>
            <p className="text-blue-200 text-lg leading-relaxed">
              Pronto para agendar seu serviço? Mande uma mensagem agora mesmo. Respondo rápido para entender e resolver o seu problema.
            </p>
          </div>
          
          <div className="flex flex-col gap-5">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 w-fit text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <MessageCircle className="w-7 h-7" /> 
              <span className="text-lg">(19) 9.9232-7227</span>
            </a>
            
            <a 
              href="https://instagram.com/RODRIGO_JHSCLIMATIZAR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-blue-300 hover:text-white transition-colors w-fit text-lg font-medium group"
            >
              <div className="bg-blue-900 p-2 rounded-lg group-hover:bg-pink-600 transition-colors">
                <Instagram className="w-6 h-6" />
              </div>
              @RODRIGO_JHSCLIMATIZAR
            </a>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <CreditCard className="w-8 h-8 text-blue-400" />
            <h4 className="text-2xl font-bold">Pagamento Facilitado</h4>
          </div>
          <p className="text-blue-200 mb-8">
            Aceito as principais formas de pagamento para não pesar no seu orçamento.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            <span className="bg-white/10 border border-white/20 text-white font-semibold py-2 px-4 rounded-xl">PIX</span>
            <span className="bg-white/10 border border-white/20 text-white font-semibold py-2 px-4 rounded-xl">Crédito</span>
            <span className="bg-white/10 border border-white/20 text-white font-semibold py-2 px-4 rounded-xl">Débito</span>
          </div>
          
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-blue-300 font-medium tracking-wider">
            <span>MASTERCARD</span> • <span>VISA</span> • <span>ELO</span> • <span>HIPERCARD</span> • <span>DINERS</span>
          </div>
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 text-center text-sm border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="flex items-center gap-2">
          <Snowflake className="w-4 h-4 text-blue-500" />
          © {new Date().getFullYear()} JHS Climatizar. Todos os direitos reservados.
        </p>
        <p>Atendendo Hortolândia - SP e Região</p>
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
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-semibold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Fale com o Rodrigo!
      </span>
    </a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-300 selection:text-blue-900 scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <ContactAndPayments />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}