import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/scales', label: 'Escalas' },
    { path: '/exchanges', label: 'Trocas' },
    { path: '/professionals', label: 'Profissionais' },
    { path: '/sectors', label: 'Setores' },
  ];

  function handleLogout() {
    logout();
  }

  return (
    <header className="bg-fluxo-teal-dark text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">🏥</span>
          <span>FluxoÁgil</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-fluxo-teal text-white font-semibold'
                  : 'hover:bg-fluxo-teal hover:text-white text-fluxo-gray-light'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 bg-fluxo-teal rounded-lg px-3 py-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-semibold">{user?.email || 'Usuário'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-fluxo-pink hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Sair</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-fluxo-pink hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
