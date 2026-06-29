import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));

// Error handlers
app.use(notFound);
app.use(errorHandler);

// DB Connect + Start
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('✅ MongoDB Atlas connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

export default app;
