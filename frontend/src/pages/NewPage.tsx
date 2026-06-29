import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Movie } from '../types';
import { movieAPI } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

const NewPage: React.FC = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleMyList, isInMyList } = useMovieContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const [tRes, nRes] = await Promise.all([movieAPI.getTrending(), movieAPI.getNewReleases()]);
        setTrending(tRes.data.data);
        setNewReleases(nRes.data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const BigCard: React.FC<{ movie: Movie; rank?: number }> = ({ movie, rank }) => (
    <div className="group relative flex gap-4 items-center bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors cursor-pointer"
      onClick={() => navigate(`/watch/${movie._id}`)}>
      {rank && <div className="text-gray-700 font-black text-6xl md:text-8xl w-16 md:w-24 flex-shrink-0 text-center leading-none select-none">{rank}</div>}
      <img src={movie.thumbnailUrl} alt={movie.title} className="w-32 md:w-40 aspect-video object-cover rounded flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-base md:text-lg mb-1 truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span className="text-green-400 font-semibold">{Math.round(movie.imdbScore * 10)}% Match</span>
          <span>{movie.releaseYear}</span>
          <span className="border border-gray-500 px-1">{movie.rating}</span>
          <span>{movie.type === 'movie' ? `${movie.duration}m` : `${movie.seasons}S`}</span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 hidden md:block">{movie.description}</p>
        <div className="flex items-center gap-2 mt-2">
          {movie.genre.slice(0, 3).map((g) => (
            <span key={g} className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded">{g}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => navigate(`/watch/${movie._id}`)} className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </button>
        {user && (
          <button onClick={() => toggleMyList(movie)} className={`rounded-full p-2 border-2 transition-colors ${isInMyList(movie._id) ? 'border-white bg-white/10' : 'border-gray-500 hover:border-white'}`}>
            {isInMyList(movie._id)
              ? <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              : <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            }
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <div className="pt-24 px-4 md:px-12">
        {/* Top 10 Trending */}
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Top 10 Today</h1>
          <p className="text-gray-400 mb-6">The most watched titles on Netflux right now</p>
          {loading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-28 bg-gray-800 rounded-lg animate-pulse" />)}</div>
          ) : (
            <div className="space-y-3">
              {trending.map((m, i) => <BigCard key={m._id} movie={m} rank={i + 1} />)}
            </div>
          )}
        </section>

        {/* New Releases */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-2">New & Coming Soon</h2>
          <p className="text-gray-400 mb-6">What's new on Netflux</p>
          {loading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-28 bg-gray-800 rounded-lg animate-pulse" />)}</div>
          ) : (
            <div className="space-y-3">
              {newReleases.map((m) => <BigCard key={m._id} movie={m} />)}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NewPage;
