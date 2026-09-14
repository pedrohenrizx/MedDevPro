import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Professionals() {
  const { professionals, addProfessional } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newProfessional, setNewProfessional] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: 'Médico',
    crm: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProfessional(newProfessional);
      setShowForm(false);
      setNewProfessional({
        name: '',
        email: '',
        phone: '',
        specialization: 'Médico',
        crm: '',
      });
    } catch (error) {
      console.error('Error creating professional:', error);
    }
  };

  return (
    <div className="min-h-screen bg-fluxo-light py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-fluxo-teal-dark">
            Profissionais
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-fluxo-teal hover:bg-fluxo-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {showForm ? 'Cancelar' : '+ Novo Profissional'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-fluxo-teal-dark mb-4">
              Cadastrar Profissional
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome</label>
                <input
                  type="text"
                  value={newProfessional.name}
                  onChange={(e) => setNewProfessional({...newProfessional, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                <input
                  type="email"
                  value={newProfessional.email}
                  onChange={(e) => setNewProfessional({...newProfessional, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                <input
                  type="tel"
                  value={newProfessional.phone}
                  onChange={(e) => setNewProfessional({...newProfessional, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Especialização</label>
                <select
                  value={newProfessional.specialization}
                  onChange={(e) => setNewProfessional({...newProfessional, specialization: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                >
                  <option value="Médico">Médico</option>
                  <option value="Enfermeiro">Enfermeiro</option>
                  <option value="Técnico de Enfermagem">Técnico de Enfermagem</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">CRM/Registro</label>
                <input
                  type="text"
                  value={newProfessional.crm}
                  onChange={(e) => setNewProfessional({...newProfessional, crm: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fluxo-teal"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-fluxo-pink hover:bg-opacity-90 text-white py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Cadastrar Profissional
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <p className="text-gray-600">Nenhum profissional cadastrado ainda.</p>
            </div>
          ) : (
            professionals.map((prof) => (
              <div
                key={prof.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-fluxo-teal"
              >
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-bold text-fluxo-teal-dark mb-2">{prof.name}</h3>
                <p className="text-gray-600 mb-1">📧 {prof.email}</p>
                <p className="text-gray-600 mb-1">📱 {prof.phone}</p>
                <p className="text-gray-600 mb-2">🏥 {prof.specialization}</p>
                <span className="inline-block bg-fluxo-gray-light px-3 py-1 rounded-full text-sm font-semibold text-fluxo-teal-dark">
                  Registro: {prof.crm}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
