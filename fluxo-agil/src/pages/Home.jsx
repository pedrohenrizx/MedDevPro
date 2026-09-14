import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: '📊',
      title: 'Dashboard Administrativo',
      description: 'Visualização em tempo real de todos os setores com indicadores de saúde da escala.',
    },
    {
      icon: '🔄',
      title: 'Trocas Inteligentes',
      description: 'Marketplace interno para trocas de plantão com validação automática de regras.',
    },
    {
      icon: '📱',
      title: 'App do Profissional',
      description: 'Agenda pessoal sincronizada e check-in geolocalizado para validação de presença.',
    },
    {
      icon: '⚖️',
      title: 'Compliance Automático',
      description: 'Bloqueio de escalas que excedam limites legais e gestão de documentos.',
    },
  ];

  return (
    <div className="min-h-screen bg-fluxo-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fluxo-teal-dark to-fluxo-teal text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            FluxoÁgil
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-fluxo-gray-light">
            Gestão Inteligente de Escalas e Plantões Hospitalares
          </p>
          <p className="text-lg mb-10 max-w-3xl mx-auto text-fluxo-gray-light">
            Elimine o caos operacional e o erro humano na gestão de escalas de profissionais de saúde.
            Uma plataforma SaaS de missão crítica para hospitais, prontos-socorros e clínicas de grande porte.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="bg-fluxo-pink hover:bg-opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg"
            >
              Acessar Dashboard
            </Link>
            <Link
              to="/scales"
              className="bg-white text-fluxo-teal-dark px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:bg-fluxo-gray-light"
            >
              Ver Escalas
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-fluxo-teal-dark mb-12 text-center">
            Funcionalidades Principais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-fluxo-teal"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-fluxo-teal-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-fluxo-gray-light py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-fluxo-pink mb-2">-80%</div>
              <div className="text-gray-600">Redução de Furos na Escala</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-fluxo-teal-dark mb-2">-60%</div>
              <div className="text-gray-600">Tempo de Gestão de Escalas</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-fluxo-orange mb-2">+95%</div>
              <div className="text-gray-600">Satisfação dos Profissionais</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-fluxo-teal-dark mb-6">
            Pronto para transformar a gestão do seu hospital?
          </h2>
          <p className="text-gray-600 mb-8">
            Junte-se a instituições de saúde que já eliminaram o apagão de profissionais com o FluxoÁgil.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-fluxo-teal-dark hover:bg-fluxo-teal text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg"
          >
            Começar Agora
          </Link>
        </div>
      </section>
    </div>
  );
}
