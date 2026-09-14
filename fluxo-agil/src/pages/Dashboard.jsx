import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { shifts, professionals, sectors, exchanges, loading } = useApp();

  const stats = {
    totalShifts: shifts.length,
    coveredShifts: shifts.filter(s => s.status === 'covered').length,
    openShifts: shifts.filter(s => s.status === 'open' || !s.professional_id).length,
    pendingExchanges: exchanges.filter(e => e.status === 'pending').length,
    totalProfessionals: professionals.length,
    totalSectors: sectors.length,
  };

  const sectorCoverage = sectors.map(sector => {
    const sectorShifts = shifts.filter(s => s.sector_id === sector.id);
    const covered = sectorShifts.filter(s => s.professional_id).length;
    const total = sectorShifts.length || 1;
    return {
      ...sector,
      coverage: Math.round((covered / total) * 100),
      openPositions: total - covered,
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-fluxo-light flex items-center justify-center">
        <div className="text-fluxo-teal-dark text-2xl">Carregando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fluxo-light py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-fluxo-teal-dark mb-8">
          Dashboard Administrativo
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-fluxo-teal">
            <div className="text-3xl font-bold text-fluxo-teal-dark">{stats.totalShifts}</div>
            <div className="text-gray-600">Total de Plantões</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-fluxo-green">
            <div className="text-3xl font-bold text-green-600">{stats.coveredShifts}</div>
            <div className="text-gray-600">Plantões Cobertos</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-fluxo-pink">
            <div className="text-3xl font-bold text-fluxo-pink">{stats.openShifts}</div>
            <div className="text-gray-600">Vagas Abertas</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-fluxo-orange">
            <div className="text-3xl font-bold text-fluxo-orange">{stats.pendingExchanges}</div>
            <div className="text-gray-600">Trocas Pendentes</div>
          </div>
        </div>

        {/* Health Indicators */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-fluxo-teal-dark mb-4">
              Saúde da Escala por Setor
            </h2>
            <div className="space-y-4">
              {sectorCoverage.map((sector) => (
                <div key={sector.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">{sector.name}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      sector.coverage >= 80 ? 'bg-fluxo-green text-green-800' :
                      sector.coverage >= 50 ? 'bg-fluxo-orange text-orange-800' :
                      'bg-fluxo-red-light text-red-800'
                    }`}>
                      {sector.coverage}% coberto
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        sector.coverage >= 80 ? 'bg-fluxo-green' :
                        sector.coverage >= 50 ? 'bg-fluxo-orange' :
                        'bg-fluxo-pink'
                      }`}
                      style={{ width: `${sector.coverage}%` }}
                    ></div>
                  </div>
                  {sector.openPositions > 0 && (
                    <div className="text-sm text-fluxo-pink mt-2">
                      ⚠️ {sector.openPositions} vaga(s) sem profissional
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-fluxo-teal-dark mb-4">
              Profissionais Ativos
            </h2>
            <div className="text-center py-8">
              <div className="text-6xl font-bold text-fluxo-teal mb-4">{stats.totalProfessionals}</div>
              <div className="text-gray-600 mb-6">Profissionais cadastrados</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-fluxo-gray-light p-4 rounded-lg">
                  <div className="text-2xl font-bold text-fluxo-teal-dark">
                    {professionals.filter(p => p.specialization === 'Médico').length}
                  </div>
                  <div className="text-sm text-gray-600">Médicos</div>
                </div>
                <div className="bg-fluxo-gray-light p-4 rounded-lg">
                  <div className="text-2xl font-bold text-fluxo-teal-dark">
                    {professionals.filter(p => p.specialization === 'Enfermeiro').length}
                  </div>
                  <div className="text-sm text-gray-600">Enfermeiros</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {stats.openShifts > 0 && (
          <div className="bg-fluxo-red-light bg-opacity-20 border-l-4 border-fluxo-pink p-6 rounded-xl">
            <h3 className="text-xl font-bold text-fluxo-pink mb-2">
              🚨 Alerta de Vagas Abertas
            </h3>
            <p className="text-gray-700">
              Existem {stats.openShifts} plantão(ões) sem profissionais alocados. 
              É necessário realizar a cobertura urgente para evitar descobertura de setores.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
