import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../types';
import { movieAPI } from '../services/api';

interface MovieContextType {
  myList: Movie[];
  setMyList: (movies: Movie[]) => void;
  toggleMyList: (movie: Movie) => Promise<void>;
  isInMyList: (id: string) => boolean;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [myList, setMyList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const toggleMyList = async (movie: Movie) => {
    try {
      await movieAPI.toggleMyList(movie._id);
      setMyList((prev) =>
        prev.some((m) => m._id === movie._id)
          ? prev.filter((m) => m._id !== movie._id)
          : [...prev, movie]
      );
    } catch (err) {
      console.error('Failed to toggle my list:', err);
    }
  };

  const isInMyList = (id: string) => myList.some((m) => m._id === id);

  return (
    <MovieContext.Provider value={{ myList, setMyList, toggleMyList, isInMyList, selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovieContext must be used within MovieProvider');
  return ctx;
};
