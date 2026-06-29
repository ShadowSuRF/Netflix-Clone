import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
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
  createdAt: Date;
}

const movieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    genre: [{ type: String }],
    type: { type: String, enum: ['movie', 'series'], default: 'movie' },
    releaseYear: { type: Number, required: true },
    duration: { type: Number, default: 0 },
    rating: { type: String, default: 'PG-13' },
    imdbScore: { type: Number, default: 7.0, min: 0, max: 10 },
    thumbnailUrl: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    videoUrl: { type: String, default: '' },
    trailerUrl: { type: String, default: '' },
    cast: [{ type: String }],
    director: { type: String, default: '' },
    isTrending: { type: Boolean, default: false },
    isNewRelease: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    seasons: { type: Number },
    episodes: { type: Number },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

movieSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IMovie>('Movie', movieSchema);
