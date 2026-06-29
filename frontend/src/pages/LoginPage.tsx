import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(https://assets.nflxext.com/ffe/siteui/vlv3/fc2aad82-5571-432b-b669-5a29e5a42879/6aec8a75-7831-4ac7-8de5-9b01cff43ab0/RS-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg) center/cover' }}
    >
      {/* Logo */}
      <div className="absolute top-4 left-6 md:left-16">
        <Link to="/" className="text-[#E50914] font-extrabold text-3xl tracking-tight">NETFLUX</Link>
      </div>

      <div className="bg-black/80 backdrop-blur-sm text-white w-full max-w-md mx-4 rounded-lg p-10 md:p-14">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>

        {error && (
          <div className="bg-[#e87c03] text-white text-sm px-4 py-3 rounded mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone number"
              required
              className="w-full bg-gray-700 text-white px-4 py-4 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-gray-700 text-white px-4 py-4 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold py-4 rounded text-base transition-colors disabled:opacity-70 mt-6"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-gray-400" defaultChecked />
            Remember me
          </label>
          <Link to="#" className="hover:underline">Need help?</Link>
        </div>

        <div className="mt-10 text-gray-400">
          <span>New to Netflux? </span>
          <Link to="/register" className="text-white hover:underline font-medium">Sign up now.</Link>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
