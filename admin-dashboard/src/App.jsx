import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const activeToken = localStorage.getItem('adminToken');
    if (activeToken) setToken(activeToken);
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  return token ? <Dashboard logout={logout} /> : <Login setToken={setToken} />;
}