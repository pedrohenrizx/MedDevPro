import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Exchanges() {
  const { exchanges, shifts, professionals, requestExchange } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newExchange, setNewExchange] = useState({
    shift_id: '',
    from_professional_id: '',
    to_professional_id: '',
    reason: '',
    status: 'pending',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestExchange(newExchange);
      setShowForm(false);
      setNewExchange({
        shift_id: '',
        from_professional_id: '',
        to_professional_id: '',
        reason: '',
        status: 'pending',
      });
    } catch (error) {
      console.error('Error creating exchange:', error);
    }
  };

  return (
    <div className="min-h-screen bg-fluxo-light py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-fluxo-teal-dark">
            Marketplace de Trocas
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-fluxo-teal hover:bg-fluxo-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {showForm ? 'Cancelar' : '+ Solicitar Troca'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-fluxo-teal-dark mb-4">
              Solicitar Troca de Plantão
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Plantão</label>
                <select
                  value={newExchange.shift_id}
                  onChange={(e) => setNewExchange({...newExchange, shift_id: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                >
                  <option value="">Selecione um plantão</option>
                  {shifts.map(shift => (
                    <option key={shift.id} value={shift.id}>
                      {new Date(shift.date).toLocaleDateString('pt-BR')} - {shift.start_time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Profissional Original</label>
                <select
                  value={newExchange.from_professional_id}
                  onChange={(e) => setNewExchange({...newExchange, from_professional_id: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                >
                  <option value="">Selecione</option>
                  {professionals.map(prof => (
                    <option key={prof.id} value={prof.id}>{prof.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Profissional Substituto</label>
                <select
                  value={newExchange.to_professional_id}
                  onChange={(e) => setNewExchange({...newExchange, to_professional_id: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                >
                  <option value="">Selecione</option>
                  {professionals.map(prof => (
                    <option key={prof.id} value={prof.id}>{prof.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Motivo</label>
                <textarea
                  value={newExchange.reason}
                  onChange={(e) => setNewExchange({...newExchange, reason: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  rows="3"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-fluxo-pink hover:bg-opacity-90 text-white py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Solicitar Troca
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {exchanges.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-4">🔄</div>
              <p className="text-gray-600">Nenhuma troca solicitada ainda.</p>
            </div>
          ) : (
            exchanges.map((exchange) => {
              const shift = shifts.find(s => s.id === exchange.shift_id);
              const fromProf = professionals.find(p => p.id === exchange.from_professional_id);
              const toProf = professionals.find(p => p.id === exchange.to_professional_id);
              
              return (
                <div
                  key={exchange.id}
                  className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${
                    exchange.status === 'approved' ? 'border-fluxo-green' :
                    exchange.status === 'rejected' ? 'border-fluxo-red-light' :
                    'border-fluxo-orange'
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <div className="text-lg font-bold text-fluxo-teal-dark">
                        📅 {shift ? new Date(shift.date).toLocaleDateString('pt-BR') : 'Data não informada'}
                      </div>
                      <div className="text-gray-600 mt-2">
                        <span className="text-fluxo-pink font-semibold">{fromProf?.name}</span>
                        {' → '}
                        <span className="text-fluxo-teal font-semibold">{toProf?.name}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Motivo: {exchange.reason}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        exchange.status === 'approved' ? 'bg-fluxo-green text-green-800' :
                        exchange.status === 'rejected' ? 'bg-fluxo-red-light text-red-800' :
                        'bg-fluxo-orange text-orange-800'
                      }`}>
                        {exchange.status === 'approved' ? '✅ Aprovada' :
                         exchange.status === 'rejected' ? '❌ Recusada' :
                         '⏳ Pendente'}
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
