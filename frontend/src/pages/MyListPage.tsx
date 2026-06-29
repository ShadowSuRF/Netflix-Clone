import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { Movie } from '../types';
import { userAPI } from '../services/api';
import { useMovieContext } from '../context/MovieContext';

const MyListPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { myList, setMyList } = useMovieContext();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await userAPI.getMyList();
        setMyList(data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [setMyList]);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <div className="pt-24 px-4 md:px-12">
        <h1 className="text-3xl font-bold mb-2">My List</h1>
        <p className="text-gray-400 mb-8">{myList.length} title{myList.length !== 1 ? 's' : ''}</p>

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => <div key={i} className="aspect-video bg-gray-800 rounded animate-pulse" />)}
          </div>
        ) : myList.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
            <p className="text-gray-400">Add movies and TV shows to your list to watch them later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {myList.map((m: Movie) => <MovieCard key={m._id} movie={m} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyListPage;
