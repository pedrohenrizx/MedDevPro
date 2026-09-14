import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Sectors() {
  const { sectors, addSector } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newSector, setNewSector] = useState({
    name: '',
    description: '',
    capacity: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSector(newSector);
      setShowForm(false);
      setNewSector({
        name: '',
        description: '',
        capacity: '',
      });
    } catch (error) {
      console.error('Error creating sector:', error);
    }
  };

  return (
    <div className="min-h-screen bg-fluxo-light py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-fluxo-teal-dark">
            Setores Hospitalares
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-fluxo-teal hover:bg-fluxo-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {showForm ? 'Cancelar' : '+ Novo Setor'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-fluxo-teal-dark mb-4">
              Cadastrar Setor
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome do Setor</label>
                <input
                  type="text"
                  value={newSector.name}
                  onChange={(e) => setNewSector({...newSector, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  placeholder="Ex: UTI, Emergência, Centro Cirúrgico"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Capacidade de Leitos</label>
                <input
                  type="number"
                  value={newSector.capacity}
                  onChange={(e) => setNewSector({...newSector, capacity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
                <textarea
                  value={newSector.description}
                  onChange={(e) => setNewSector({...newSector, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  rows="3"
                  placeholder="Descreva as características do setor..."
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-fluxo-pink hover:bg-opacity-90 text-white py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Cadastrar Setor
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-4">🏥</div>
              <p className="text-gray-600">Nenhum setor cadastrado ainda.</p>
            </div>
          ) : (
            sectors.map((sector) => (
              <div
                key={sector.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-fluxo-teal"
              >
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-bold text-fluxo-teal-dark mb-2">{sector.name}</h3>
                <p className="text-gray-600 mb-4">{sector.description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-fluxo-gray-light px-3 py-1 rounded-full text-sm font-semibold text-fluxo-teal-dark">
                    🛏️ {sector.capacity} leitos
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
