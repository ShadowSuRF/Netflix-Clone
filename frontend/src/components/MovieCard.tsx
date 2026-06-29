import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { useMovieContext } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps { movie: Movie; }

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const { toggleMyList, isInMyList } = useMovieContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="relative flex-shrink-0 w-36 md:w-44 cursor-pointer transition-transform duration-300 hover:z-20"
      style={{ transform: hovered ? 'scale(1.25)' : 'scale(1)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={movie.thumbnailUrl}
        alt={movie.title}
        className="w-full aspect-video object-cover rounded"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180/141414/808080?text=No+Image';
        }}
      />

      {/* Hover overlay */}
      {hovered && (
        <div className="absolute inset-0 bg-[#141414] rounded shadow-2xl overflow-hidden flex flex-col" style={{ top: '100%', left: '-10%', width: '120%' }}>
          <img src={movie.thumbnailUrl} alt={movie.title} className="w-full aspect-video object-cover" />
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => navigate(`/watch/${movie._id}`)}
                className="bg-white rounded-full p-1.5 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </button>
              {user && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMyList(movie); }}
                  className="border-2 border-gray-400 rounded-full p-1.5 hover:border-white transition-colors"
                >
                  {isInMyList(movie._id)
                    ? <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    : <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  }
                </button>
              )}
              <button className="border-2 border-gray-400 rounded-full p-1.5 hover:border-white transition-colors ml-auto">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <h3 className="text-white text-xs font-bold mb-1 line-clamp-1">{movie.title}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-400 font-semibold">{Math.round(movie.imdbScore * 10)}%</span>
              <span className="text-gray-400">{movie.releaseYear}</span>
              <span className="border border-gray-500 text-gray-400 px-1 text-xs">{movie.rating}</span>
            </div>
            <div className="flex gap-1 mt-1 flex-wrap">
              {movie.genre.slice(0, 2).map((g) => (
                <span key={g} className="text-gray-400 text-xs">{g}{movie.genre.indexOf(g) < Math.min(movie.genre.length, 2) - 1 ? ' •' : ''}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
