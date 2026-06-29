import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import { Movie } from '../types';
import { movieAPI, userAPI } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const [featured, setFeatured] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [action, setAction] = useState<Movie[]>([]);
  const [drama, setDrama] = useState<Movie[]>([]);
  const [scifi, setScifi] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { setMyList } = useMovieContext();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [featRes, trendRes, newRes, actionRes, dramaRes, scifiRes] = await Promise.all([
          movieAPI.getFeatured(),
          movieAPI.getTrending(),
          movieAPI.getNewReleases(),
          movieAPI.getByGenre('Action'),
          movieAPI.getByGenre('Drama'),
          movieAPI.getByGenre('Sci-Fi'),
        ]);
        setFeatured(featRes.data.data);
        setTrending(trendRes.data.data);
        setNewReleases(newRes.data.data);
        setAction(actionRes.data.data);
        setDrama(dramaRes.data.data);
        setScifi(scifiRes.data.data);

        if (user) {
          const listRes = await userAPI.getMyList();
          setMyList(listRes.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [user, setMyList]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-[#E50914] font-extrabold text-4xl">NETFLUX</div>
          <div className="w-12 h-1 bg-[#E50914] rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <Hero movies={featured} />
      <div className="-mt-16 relative z-10">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="New Releases" movies={newReleases} />
        <MovieRow title="Action & Adventure" movies={action} />
        <MovieRow title="Drama" movies={drama} />
        <MovieRow title="Sci-Fi & Fantasy" movies={scifi} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
