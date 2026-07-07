import { useState } from 'react';
import api from '../utils/api';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/auth/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">Dashboard Access</h2>
          <p className="text-xs text-slate-400 font-semibold tracking-wider mt-1 uppercase">Yehbon Public School Central CMS</p>
        </div>
        {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-semibold text-rose-400">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Username</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500" placeholder="admin" />
          </div>
          <div className="space-y-1 relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security Password</label>
            <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500" placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-[38px] text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg transition-colors cursor-pointer">Verify & Enter Dashboard</button>
        </form>
      </div>
    </div>
  );
}