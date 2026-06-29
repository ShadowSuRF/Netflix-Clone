import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError(''); setLoading(true);
    try {
      await register(name, email, password);
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(https://assets.nflxext.com/ffe/siteui/vlv3/fc2aad82-5571-432b-b669-5a29e5a42879/6aec8a75-7831-4ac7-8de5-9b01cff43ab0/RS-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg) center/cover' }}
    >
      <div className="absolute top-4 left-6 md:left-16">
        <Link to="/" className="text-[#E50914] font-extrabold text-3xl tracking-tight">NETFLUX</Link>
      </div>

      <div className="bg-black/80 backdrop-blur-sm text-white w-full max-w-md mx-4 rounded-lg p-10 md:p-14">
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>

        {error && <div className="bg-[#e87c03] text-white text-sm px-4 py-3 rounded mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required className="w-full bg-gray-700 text-white px-4 py-4 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required className="w-full bg-gray-700 text-white px-4 py-4 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Add a password (min 6 chars)" required className="w-full bg-gray-700 text-white px-4 py-4 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400" />
          <button type="submit" disabled={loading} className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold py-4 rounded text-base transition-colors disabled:opacity-70 mt-6">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-10 text-gray-400">
          <span>Already have an account? </span>
          <Link to="/login" className="text-white hover:underline font-medium">Sign in.</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
