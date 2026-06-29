import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { useMovieContext } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

interface HeroProps { movies: Movie[]; }

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const { toggleMyList, isInMyList } = useMovieContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % movies.length), 8000);
    return () => clearInterval(timer);
  }, [movies]);

  if (movies.length === 0) return null;
  const movie = movies[current];

  return (
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          key={movie._id}
          src={movie.bannerUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity duration-1000"
          onError={(e) => { (e.target as HTMLImageElement).src = movie.thumbnailUrl; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-16 max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#E50914] text-white text-xs font-bold px-2 py-1 rounded">
            {movie.type === 'series' ? 'SERIES' : 'FILM'}
          </span>
          {movie.isNewRelease && <span className="border border-gray-400 text-gray-300 text-xs px-2 py-1 rounded">NEW</span>}
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight drop-shadow-2xl">
          {movie.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
          <span className="text-green-400 font-semibold">{Math.round(movie.imdbScore * 10)}% Match</span>
          <span>{movie.releaseYear}</span>
          <span className="border border-gray-500 px-1.5 py-0.5 text-xs">{movie.rating}</span>
          {movie.type === 'movie' ? (
            <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
          ) : (
            <span>{movie.seasons} Season{(movie.seasons || 1) > 1 ? 's' : ''}</span>
          )}
        </div>

        <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
          {movie.description}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/watch/${movie._id}`)}
            className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors text-base"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          {user && (
            <button
              onClick={() => toggleMyList(movie)}
              className="flex items-center gap-2 bg-gray-600/70 text-white font-semibold px-6 py-3 rounded hover:bg-gray-500/70 transition-colors text-base backdrop-blur-sm"
            >
              {isInMyList(movie._id) ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
              My List
            </button>
          )}
          <button className="flex items-center gap-2 bg-gray-600/70 text-white font-semibold px-4 py-3 rounded hover:bg-gray-500/70 transition-colors backdrop-blur-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>
      </div>

      {/* Dots */}
      {movies.length > 1 && (
        <div className="absolute bottom-8 right-8 flex gap-1.5 z-10">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#E50914]' : 'w-3 bg-gray-500'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
