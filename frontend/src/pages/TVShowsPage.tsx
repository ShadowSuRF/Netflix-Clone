import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { Movie } from '../types';
import { movieAPI } from '../services/api';

const GENRES = ['All', 'Drama', 'Sci-Fi', 'Crime', 'Action', 'Thriller', 'Mystery', 'Fantasy', 'History', 'Horror'];

const TVShowsPage: React.FC = () => {
  const [shows, setShows] = useState<Movie[]>([]);
  const [activeGenre, setActiveGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        let res;
        if (activeGenre === 'All') res = await movieAPI.getAll({ type: 'series', limit: 40 });
        else res = await movieAPI.getByGenre(activeGenre);
        const data = res.data.data.filter((m: Movie) => m.type === 'series');
        setShows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [activeGenre]);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <div className="pt-24 px-4 md:px-12">
        <h1 className="text-3xl font-bold mb-6">TV Shows</h1>
        <div className="flex gap-2 flex-wrap mb-8">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeGenre === g ? 'bg-white text-black border-white' : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'}`}
            >
              {g}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {Array.from({ length: 21 }).map((_, i) => <div key={i} className="aspect-video bg-gray-800 rounded animate-pulse" />)}
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-24 text-gray-400">No TV shows found for "{activeGenre}"</div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {shows.map((m) => <MovieCard key={m._id} movie={m} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TVShowsPage;
