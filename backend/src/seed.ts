import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie';

dotenv.config();

const movies = [
  {
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    genre: ['Sci-Fi', 'Horror', 'Drama'],
    type: 'series',
    releaseYear: 2016,
    duration: 50,
    rating: 'TV-14',
    imdbScore: 8.7,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    director: 'The Duffer Brothers',
    isTrending: true, isNewRelease: false, isFeatured: true,
    seasons: 4, episodes: 42, views: 150000,
  },
  {
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    genre: ['Drama', 'History', 'Biography'],
    type: 'series',
    releaseYear: 2016,
    duration: 58,
    rating: 'TV-MA',
    imdbScore: 8.6,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/1M876KPjulVwppEpldhdc8V4o68.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    cast: ['Claire Foy', 'Matt Smith', 'Olivia Colman'],
    director: 'Peter Morgan',
    isTrending: true, isNewRelease: false, isFeatured: false,
    seasons: 6, episodes: 60, views: 90000,
  },
  {
    title: 'Extraction',
    description: 'A hardened mercenary\'s mission becomes a soul-searching race to survive when he\'s sent into Bangladesh to rescue a drug lord\'s kidnapped son.',
    genre: ['Action', 'Thriller'],
    type: 'movie',
    releaseYear: 2020,
    duration: 116,
    rating: 'R',
    imdbScore: 6.7,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/bnmBn6PoR7fg7tz0mJ4vZoRfMdJ.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/1R6cvRtZgsYCkh8UFuWFN33xBP4.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    cast: ['Chris Hemsworth', 'Rudhraksh Jaiswal'],
    director: 'Sam Hargrave',
    isTrending: true, isNewRelease: true, isFeatured: false,
    views: 200000,
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    type: 'movie',
    releaseYear: 2010,
    duration: 148,
    rating: 'PG-13',
    imdbScore: 8.8,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    director: 'Christopher Nolan',
    isTrending: false, isNewRelease: false, isFeatured: true,
    views: 500000,
  },
  {
    title: 'Money Heist',
    description: 'A criminal mastermind who goes by "The Professor" has a plan to pull off the biggest heist in recorded history.',
    genre: ['Crime', 'Drama', 'Thriller'],
    type: 'series',
    releaseYear: 2017,
    duration: 45,
    rating: 'TV-MA',
    imdbScore: 8.2,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    cast: ['Álvaro Morte', 'Úrsula Corberó', 'Itziar Ituño'],
    director: 'Álex Pina',
    isTrending: true, isNewRelease: false, isFeatured: true,
    seasons: 5, episodes: 41, views: 300000,
  },
  {
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    genre: ['Action', 'Adventure', 'Fantasy'],
    type: 'series',
    releaseYear: 2019,
    duration: 60,
    rating: 'TV-MA',
    imdbScore: 8.2,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/qbkAqmmEIZfrCO8ZQAuIuV5hO4f.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
    director: 'Lauren Schmidt Hissrich',
    isTrending: false, isNewRelease: true, isFeatured: false,
    seasons: 3, episodes: 24, views: 180000,
  },
  {
    title: 'Bird Box',
    description: 'Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid to reach safety.',
    genre: ['Drama', 'Horror', 'Sci-Fi'],
    type: 'movie',
    releaseYear: 2018,
    duration: 124,
    rating: 'R',
    imdbScore: 6.6,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/rGfGfgL2pEPCfhBvvHOAcBtzsXa.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/rGfGfgL2pEPCfhBvvHOAcBtzsXa.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    cast: ['Sandra Bullock', 'Trevante Rhodes', 'John Malkovich'],
    director: 'Susanne Bier',
    isTrending: false, isNewRelease: false, isFeatured: false,
    views: 250000,
  },
  {
    title: 'Squid Game',
    description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    genre: ['Action', 'Drama', 'Mystery'],
    type: 'series',
    releaseYear: 2021,
    duration: 55,
    rating: 'TV-MA',
    imdbScore: 8.0,
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/qw3J9cNeLioOLoR68WX7z79aCdK.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    cast: ['Lee Jung-jae', 'Park Hae-soo', 'HoYeon Jung'],
    director: 'Hwang Dong-hyuk',
    isTrending: true, isNewRelease: true, isFeatured: true,
    seasons: 2, episodes: 18, views: 600000,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');

    await Movie.deleteMany({});
    console.log('🗑️  Cleared existing movies');

    await Movie.insertMany(movies);
    console.log(`✅ Seeded ${movies.length} movies successfully`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
