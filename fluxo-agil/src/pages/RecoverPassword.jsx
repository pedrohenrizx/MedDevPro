import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

export default function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular envio de email de recuperação
    // Em produção, integraria com o backend real
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
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
          <p className="mt-2 text-fluxo-brown">Recuperação de Senha</p>
        </div>

        {/* Card de Recuperação */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-fluxo-teal-dark rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-fluxo-teal-dark">Esqueceu a Senha?</h2>
            <p className="text-fluxo-brown mt-1">
              Digite seu e-mail e enviaremos instruções para redefinir sua senha
            </p>
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
              <p className="text-sm text-fluxo-teal-dark">
                E-mail enviado com sucesso! Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-fluxo-teal-dark mb-2">
                  E-mail Cadastrado
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-fluxo-teal-dark hover:bg-fluxo-teal text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Instruções'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-fluxo-gray-light">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-fluxo-teal-dark font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Login
            </Link>
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
