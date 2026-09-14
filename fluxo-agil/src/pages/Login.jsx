import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Falha ao fazer login. Verifique suas credenciais.');
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
          <p className="mt-2 text-fluxo-brown">Gestão Inteligente de Escalas Hospitalares</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-fluxo-teal-dark rounded-full mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-fluxo-teal-dark">Acessar Sistema</h2>
            <p className="text-fluxo-brown mt-1">Entre com suas credenciais</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-fluxo-red-light bg-opacity-20 border border-fluxo-red-light rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-fluxo-pink flex-shrink-0 mt-0.5" />
              <p className="text-sm text-fluxo-pink">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-fluxo-teal-dark mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fluxo-gray" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-fluxo-gray rounded-lg focus:outline-none focus:border-fluxo-teal transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-fluxo-teal rounded focus:ring-fluxo-teal" />
                <span className="ml-2 text-sm text-fluxo-brown">Lembrar-me</span>
              </label>
              <Link to="/recover-password" className="text-sm text-fluxo-teal hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-fluxo-teal-dark hover:bg-fluxo-teal text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-fluxo-gray-light">
            <p className="text-center text-sm text-fluxo-brown">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-fluxo-teal-dark font-semibold hover:underline">
                Cadastre-se
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
