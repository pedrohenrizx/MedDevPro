import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scales from './pages/Scales';
import Exchanges from './pages/Exchanges';
import Professionals from './pages/Professionals';
import Sectors from './pages/Sectors';
import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-fluxo-light">
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              
              {/* Rotas Protegidas */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Header />
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/scales" element={
                <ProtectedRoute>
                  <Header />
                  <Scales />
                </ProtectedRoute>
              } />
              <Route path="/exchanges" element={
                <ProtectedRoute>
                  <Header />
                  <Exchanges />
                </ProtectedRoute>
              } />
              <Route path="/professionals" element={
                <ProtectedRoute>
                  <Header />
                  <Professionals />
                </ProtectedRoute>
              } />
              <Route path="/sectors" element={
                <ProtectedRoute>
                  <Header />
                  <Sectors />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
