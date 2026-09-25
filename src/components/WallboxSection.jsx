import React from 'react';
import wallboxImg from '../assets/img/wallbox-banner.jpg';

export function WallboxSection() {
  return (
    <section id="wallbox" className="bg-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
              INSTALAÇÃO DE PAINEL PARA CARRO ELÉTRICO <span className="text-blue-500">(WALLBOX)</span>
            </h2>
            <p className="text-xl text-gray-700 font-semibold italic">
              Mais praticidade, segurança e mobilidade para você!
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">✓</span>
              <span className="text-gray-800 font-medium"><strong>INSTALAÇÃO SEGURA</strong> e com profissionais qualificados</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">⚡</span>
              <span className="text-gray-800 font-medium"><strong>CARREGAMENTO EFICIENTE</strong> para o seu veículo elétrico</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">🏠</span>
              <span className="text-gray-800 font-medium"><strong>SOLUÇÕES RESIDENCIAIS</strong> e para empresas</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">⚙️</span>
              <span className="text-gray-800 font-medium"><strong>SUPORTE E ORIENTAÇÃO</strong> em todo o processo</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm text-center shadow-md">
              SEU CARRO ELÉTRICO SEMPRE CARREGADO!
            </div>
            <div className="bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full font-bold text-sm text-center shadow-md">
              TECNOLOGIA E CONFORTO AO SEU ALCANCE!
            </div>
          </div>

          <div className="pt-6">
            <a 
              href="https://wa.me/5519992327227" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
            >
              <span>📱</span> (19) 99232-7227 - Rodrigo
            </a>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-blue-100">
            {wallboxImg ? (
              <img 
                src={wallboxImg} 
                alt="Instalação de Painel para Carro Elétrico Wallbox" 
                className="w-full max-w-md h-auto max-h-[460px] rounded-xl object-contain shadow-md"
              />
            ) : (
              <div className="w-full max-w-md h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 italic">
                [Substituir pela imagem do Wallbox]
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default WallboxSection;
