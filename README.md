# 🎬 Netflux — Netflix Clone

Full-stack Netflix clone built with **React 18 + TypeScript**, **Node.js/Express**, **MongoDB Atlas**, and **Tailwind CSS**.

![Stack](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Node.js](https://img.shields.io/badge/Node.js-20-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 Auth | Register / Login / JWT token / Protected routes |
| 🎥 Browse | Hero carousel, Genre rows, Trending, New Releases |
| 🔍 Search | Live search with instant results dropdown |
| ▶️ Video Player | Custom player with progress bar, volume, fullscreen, skip |
| 📋 My List | Add/remove movies, persisted per user |
| 💾 Watch Progress | Auto-saves every 30s to MongoDB |
| 👤 Profile | Change name, avatar picker, change password |
| 📺 TV Shows | Separate page with genre filtering |
| 🎞️ Movies | Separate page with genre filtering |
| 🔥 Top 10 | Trending page with rank badges |

---

## 🗂️ Project Structure

```
netflix-clone/
├── frontend/          # React 18 + TypeScript + Tailwind CSS (port 3000)
│   └── src/
│       ├── components/   Navbar, Hero, MovieRow, MovieCard, Footer
│       ├── pages/        Landing, Login, Register, Home, Movies, TVShows, Watch, MyList, New, Profile
│       ├── context/      AuthContext, MovieContext
│       ├── services/     api.ts (Axios)
│       └── types/        TypeScript interfaces
└── backend/           # Node.js + Express + TypeScript (port 5001)
    └── src/
        ├── controllers/  authController, movieController, userController
        ├── middleware/   auth (JWT), errorHandler
        ├── models/       User, Movie
        ├── routes/       authRoutes, movieRoutes, userRoutes
        ├── server.ts
        └── seed.ts       8 pre-seeded movies/series
```

---

## 🚀 Quick Setup — Step by Step

### Step 1 — Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/netflix-clone.git
cd netflix-clone
```

### Step 2 — Setup MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) → Sign up / Login
2. Create a **free cluster** (M0)
3. Under **Database Access** → Add user (username + password, note them down)
4. Under **Network Access** → Add IP: `0.0.0.0/0` (allow all, for dev)
5. Under **Clusters** → Click **Connect** → **Drivers** → Copy connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

### Step 3 — Configure backend environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5001
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/netflix-clone?retryWrites=true&w=majority
JWT_SECRET=any_long_random_secret_string_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Step 4 — Configure frontend environment

```bash
cd ../frontend
cp .env.example .env
```

`.env` should already contain:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Step 5 — Install all dependencies

```bash
# From project root
cd ..
npm install          # installs concurrently

cd backend
npm install

cd ../frontend
npm install
```

### Step 6 — Seed the database (8 movies/series)

```bash
cd backend
npm run seed
```

Output should be:
```
✅ Connected to MongoDB
🗑️  Cleared existing movies
✅ Seeded 8 movies successfully
👋 Disconnected from MongoDB
```

### Step 7 — Run development servers

**Option A — Run both at once from root:**
```bash
cd ..   # back to netflix-clone root
npm run dev
```

**Option B — Run separately:**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start
```

### Step 8 — Open the app

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5001/api/health](http://localhost:5001/api/health)

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |

### Movies
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/movies` | ❌ | All movies (filter: type, genre, search) |
| GET | `/api/movies/trending` | ❌ | Trending movies |
| GET | `/api/movies/featured` | ❌ | Featured (hero carousel) |
| GET | `/api/movies/new-releases` | ❌ | New releases |
| GET | `/api/movies/search?q=query` | ❌ | Search movies |
| GET | `/api/movies/genre/:genre` | ❌ | Movies by genre |
| GET | `/api/movies/:id` | ❌ | Single movie detail |
| POST | `/api/movies/:id/my-list` | ✅ | Toggle my list |
| POST | `/api/movies/:id/progress` | ✅ | Save watch progress |

### User (all require auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/my-list` | Get user's saved list |
| GET | `/api/user/watch-history` | Watch history |
| PUT | `/api/user/profile` | Update name/avatar |
| PUT | `/api/user/change-password` | Change password |

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS 3 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| State | React Context API |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Dev Tools | ts-node, nodemon, concurrently |

---

## 🗄️ Database Schemas

### User
```
name, email, password (hashed), avatar, myList[], watchHistory[]
```

### Movie
```
title, description, genre[], type, releaseYear, duration, rating,
imdbScore, thumbnailUrl, bannerUrl, videoUrl, trailerUrl, cast[],
director, isTrending, isNewRelease, isFeatured, seasons, episodes, views
```

---

## 🐳 Optional: Run with Docker

```yaml
# docker-compose.yml (add to root if needed)
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ['5001:5001']
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
  frontend:
    build: ./frontend
    ports: ['3000:3000']
    depends_on: [backend]
```

---

## 📝 Notes

- Video URLs in seed data use public Google sample videos (no DRM). Replace with your own CDN URLs for production.
- Thumbnail/banner URLs use TMDB image CDN — publicly accessible.
- This is an **educational clone project** — not affiliated with Netflix, Inc.

---

## 📄 License

MIT — Free to use for educational purposes.
# Netflix-Clone
