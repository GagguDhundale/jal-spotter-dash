import { LoginPage } from '../components/LoginPage';
import { Dashboard } from '../components/Dashboard';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { user, logout } = useAuth();

  const handleLogin = () => {
    // Login handled by AuthContext
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={logout} />;
};

export default Index;
