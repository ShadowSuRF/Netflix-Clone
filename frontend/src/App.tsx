import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TVShowsPage from './pages/TVShowsPage';
import WatchPage from './pages/WatchPage';
import MyListPage from './pages/MyListPage';
import NewPage from './pages/NewPage';
import ProfilePage from './pages/ProfilePage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center">
      <div className="text-[#E50914] font-extrabold text-4xl animate-pulse">NETFLUX</div>
    </div>
  );
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/home" replace /> : <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
    <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
    <Route path="/movies" element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
    <Route path="/tv-shows" element={<PrivateRoute><TVShowsPage /></PrivateRoute>} />
    <Route path="/watch/:id" element={<PrivateRoute><WatchPage /></PrivateRoute>} />
    <Route path="/my-list" element={<PrivateRoute><MyListPage /></PrivateRoute>} />
    <Route path="/new" element={<PrivateRoute><NewPage /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <MovieProvider>
        <AppRoutes />
      </MovieProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
