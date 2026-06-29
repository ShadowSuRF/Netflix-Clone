import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { movieAPI } from '../services/api';
import { Movie } from '../types';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const { data } = await movieAPI.search(searchQuery);
          setSearchResults(data.data.slice(0, 5));
        } catch { setSearchResults([]); }
      } else { setSearchResults([]); }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchResults([]);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'TV Shows', path: '/tv-shows' },
    { label: 'Movies', path: '/movies' },
    { label: 'New & Popular', path: '/new' },
    { label: 'My List', path: '/my-list' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/home">
            <div className="text-[#E50914] font-extrabold text-3xl tracking-tight select-none">NETFLUX</div>
          </Link>
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm transition-colors ${isActive(link.path) ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <div className={`flex items-center bg-black/70 border rounded transition-all duration-300 ${searchOpen ? 'border-white w-64' : 'border-transparent w-8'}`}>
              <button onClick={() => setSearchOpen(true)} className="p-1.5 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-white text-sm py-1.5 pr-3 outline-none w-full placeholder-gray-400"
                />
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-10 right-0 w-80 bg-[#141414] border border-gray-700 rounded shadow-2xl overflow-hidden">
                {searchResults.map((movie) => (
                  <div
                    key={movie._id}
                    onClick={() => { navigate(`/watch/${movie._id}`); setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer"
                  >
                    <img src={movie.thumbnailUrl} alt={movie.title} className="w-14 h-10 object-cover rounded" />
                    <div>
                      <p className="text-white text-sm font-medium">{movie.title}</p>
                      <p className="text-gray-400 text-xs">{movie.type === 'series' ? 'TV Show' : 'Movie'} · {movie.releaseYear}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification bell */}
          <button className="text-white hover:text-gray-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
              <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded" />
              <svg className={`w-4 h-4 text-white transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-12 w-52 bg-[#141414] border border-gray-700 rounded shadow-2xl py-2">
                <div className="flex items-center gap-3 px-4 py-2 mb-2 border-b border-gray-700">
                  <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded" />
                  <span className="text-white text-sm font-medium">{user?.name}</span>
                </div>
                <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white text-sm hover:bg-gray-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Manage Profile
                </Link>
                <Link to="/my-list" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white text-sm hover:bg-gray-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  My List
                </Link>
                <hr className="border-gray-700 my-2" />
                <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white text-sm hover:bg-gray-800 transition-colors w-full text-left">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
