import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Falha ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-fluxo-light flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-fluxo-teal-dark">
            <span>🏥</span>
            <span>FluxoÁgil</span>
          </Link>
          <p className="mt-2 text-fluxo-brown">Crie sua conta gratuitamente</p>
        </div>

        {/* Card de Registro */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-fluxo-teal-dark rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-fluxo-teal-dark">Nova Conta</h2>
            <p className="text-fluxo-brown mt-1">Preencha os dados abaixo</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-fluxo-red-light bg-opacity-20 border border-fluxo-red-light rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-fluxo-pink flex-shrink-0 mt-0.5" />
              <p className="text-sm text-fluxo-pink">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-fluxo-green bg-opacity-30 border border-fluxo-teal rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-fluxo-teal-dark flex-shrink-0 mt-0.5" />
              <p className="text-sm text-fluxo-teal-dark">Conta criada com sucesso! Redirecionando...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-fluxo-teal-dark mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fluxo-gray" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-fluxo-gray rounded-lg focus:outline-none focus:border-fluxo-teal transition-colors"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-fluxo-teal-dark mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fluxo-gray" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-fluxo-gray rounded-lg focus:outline-none focus:border-fluxo-teal transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-fluxo-teal-dark mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fluxo-gray" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-fluxo-gray rounded-lg focus:outline-none focus:border-fluxo-teal transition-colors"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-fluxo-teal-dark mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fluxo-gray" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-fluxo-gray rounded-lg focus:outline-none focus:border-fluxo-teal transition-colors"
                  placeholder="Repita a senha"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <input type="checkbox" id="terms" className="w-4 h-4 text-fluxo-teal rounded focus:ring-fluxo-teal mt-1" required />
              <label htmlFor="terms" className="ml-2 text-sm text-fluxo-brown">
                Concordo com os{' '}
                <Link to="/terms" className="text-fluxo-teal-dark font-semibold hover:underline">
                  Termos de Uso
                </Link>{' '}
                e{' '}
                <Link to="/privacy" className="text-fluxo-teal-dark font-semibold hover:underline">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-fluxo-teal-dark hover:bg-fluxo-teal text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Criando conta...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-fluxo-gray-light">
            <p className="text-center text-sm text-fluxo-brown">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-fluxo-teal-dark font-semibold hover:underline">
                Fazer Login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-xs text-fluxo-brown">
          © 2024 FluxoÁgil. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
