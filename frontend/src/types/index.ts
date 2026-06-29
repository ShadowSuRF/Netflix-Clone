export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  type: 'movie' | 'series';
  releaseYear: number;
  duration: number;
  rating: string;
  imdbScore: number;
  thumbnailUrl: string;
  bannerUrl: string;
  videoUrl: string;
  trailerUrl: string;
  cast: string[];
  director: string;
  isTrending: boolean;
  isNewRelease: boolean;
  isFeatured: boolean;
  seasons?: number;
  episodes?: number;
  views: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  message?: string;
}
