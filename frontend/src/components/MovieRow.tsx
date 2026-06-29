import React, { useRef } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      const amount = dir === 'left' ? -600 : 600;
      rowRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="py-4 group/row">
      <h2 className="text-white font-bold text-lg md:text-xl px-4 md:px-12 mb-3">{title}</h2>
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Row */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-12 py-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
