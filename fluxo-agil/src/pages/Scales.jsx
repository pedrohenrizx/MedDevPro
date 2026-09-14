import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Scales() {
  const { shifts, sectors, professionals, addShift } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newShift, setNewShift] = useState({
    sector_id: '',
    professional_id: '',
    date: '',
    start_time: '',
    end_time: '',
    status: 'open',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addShift(newShift);
      setShowForm(false);
      setNewShift({
        sector_id: '',
        professional_id: '',
        date: '',
        start_time: '',
        end_time: '',
        status: 'open',
      });
    } catch (error) {
      console.error('Error creating shift:', error);
    }
  };

  return (
    <div className="min-h-screen bg-fluxo-light py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-fluxo-teal-dark">
            Escalas de Plantão
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-fluxo-teal hover:bg-fluxo-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {showForm ? 'Cancelar' : '+ Novo Plantão'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-fluxo-teal-dark mb-4">
              Criar Novo Plantão
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Setor</label>
                <select
                  value={newShift.sector_id}
                  onChange={(e) => setNewShift({...newShift, sector_id: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                >
                  <option value="">Selecione um setor</option>
                  {sectors.map(sector => (
                    <option key={sector.id} value={sector.id}>{sector.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Profissional</label>
                <select
                  value={newShift.professional_id}
                  onChange={(e) => setNewShift({...newShift, professional_id: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                >
                  <option value="">Não atribuído</option>
                  {professionals.map(prof => (
                    <option key={prof.id} value={prof.id}>{prof.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Data</label>
                <input
                  type="date"
                  value={newShift.date}
                  onChange={(e) => setNewShift({...newShift, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Início</label>
                  <input
                    type="time"
                    value={newShift.start_time}
                    onChange={(e) => setNewShift({...newShift, start_time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Fim</label>
                  <input
                    type="time"
                    value={newShift.end_time}
                    onChange={(e) => setNewShift({...newShift, end_time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-fluxo-pink hover:bg-opacity-90 text-white py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Criar Plantão
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {shifts.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-600">Nenhum plantão cadastrado ainda.</p>
            </div>
          ) : (
            shifts.map((shift) => {
              const sector = sectors.find(s => s.id === shift.sector_id);
              const professional = professionals.find(p => p.id === shift.professional_id);
              
              return (
                <div
                  key={shift.id}
                  className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${
                    shift.professional_id ? 'border-fluxo-green' : 'border-fluxo-pink'
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <div className="text-lg font-bold text-fluxo-teal-dark">
                        {sector?.name || 'Setor não informado'}
                      </div>
                      <div className="text-gray-600">
                        📅 {new Date(shift.date).toLocaleDateString('pt-BR')}
                        {' '}•{' '}
                        ⏰ {shift.start_time} - {shift.end_time}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-gray-700">
                          {professional ? professional.name : 'Vaga Aberta'}
                        </div>
                        {professional && (
                          <div className="text-sm text-gray-500">{professional.specialization}</div>
                        )}
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        shift.professional_id
                          ? 'bg-fluxo-green text-green-800'
                          : 'bg-fluxo-red-light text-red-800'
                      }`}>
                        {shift.professional_id ? 'Coberto' : 'Aberto'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
