import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fluxo-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-fluxo-teal mx-auto"></div>
          <p className="mt-4 text-fluxo-teal-dark font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar role se necessário
  if (requiredRole) {
    // Implementar lógica de verificação de role quando disponível no token
    // const userRole = user?.role;
    // if (userRole !== requiredRole) {
    //   return <Navigate to="/unauthorized" replace />;
    // }
  }

  return children;
}
