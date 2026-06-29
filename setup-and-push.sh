#!/bin/bash
# ============================================================
#  NETFLUX - Netflix Clone
#  Step-by-step GitHub Push Script
#  Usage: bash setup-and-push.sh
# ============================================================

set -e  # exit on error

REPO_URL="https://github.com/YOUR_USERNAME/netflix-clone.git"
# ⬆️  GANTI dengan URL repo GitHub lo sebelum jalankan!

echo "╔══════════════════════════════════════╗"
echo "║   NETFLUX - GitHub Push Script       ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ──────────────────────────────────────────
# STEP 1 — INIT GIT & REMOTE
# ──────────────────────────────────────────
echo "▶ STEP 1: Init git repository..."
git init
git remote add origin $REPO_URL
echo "✅ Git initialized"
echo ""

# ──────────────────────────────────────────
# STEP 2 — ROOT CONFIG
# ──────────────────────────────────────────
echo "▶ STEP 2: Commit root config files..."
git add .gitignore package.json README.md
git commit -m "chore: add root config, gitignore, and README"
echo "✅ Root config committed"
echo ""

# ──────────────────────────────────────────
# STEP 3 — BACKEND INIT
# ──────────────────────────────────────────
echo "▶ STEP 3: Commit backend project setup..."
git add backend/package.json backend/tsconfig.json backend/.env.example
git commit -m "chore(backend): init Node.js + Express + TypeScript project"
echo "✅ Backend init committed"
echo ""

# ──────────────────────────────────────────
# STEP 4 — BACKEND MODELS
# ──────────────────────────────────────────
echo "▶ STEP 4: Commit database models..."
git add backend/src/models/
git commit -m "feat(backend): add User and Movie mongoose models

- User: name, email, bcrypt password, avatar, myList, watchHistory
- Movie: full schema with genre, type, ratings, URLs, cast, flags"
echo "✅ Models committed"
echo ""

# ──────────────────────────────────────────
# STEP 5 — BACKEND MIDDLEWARE
# ──────────────────────────────────────────
echo "▶ STEP 5: Commit middleware..."
git add backend/src/middleware/ backend/src/types/
git commit -m "feat(backend): add JWT auth middleware and error handler

- protect() middleware verifies Bearer token
- errorHandler and notFound middleware
- AuthRequest and JwtPayload TypeScript types"
echo "✅ Middleware committed"
echo ""

# ──────────────────────────────────────────
# STEP 6 — BACKEND CONTROLLERS
# ──────────────────────────────────────────
echo "▶ STEP 6: Commit controllers..."
git add backend/src/controllers/
git commit -m "feat(backend): add auth, movie, and user controllers

- authController: register, login, getMe with JWT signing
- movieController: getAll, trending, featured, search, myList, progress
- userController: getMyList, watchHistory, updateProfile, changePassword"
echo "✅ Controllers committed"
echo ""

# ──────────────────────────────────────────
# STEP 7 — BACKEND ROUTES
# ──────────────────────────────────────────
echo "▶ STEP 7: Commit API routes..."
git add backend/src/routes/
git commit -m "feat(backend): add REST API routes

- /api/auth  → register, login, me
- /api/movies → CRUD, search, trending, featured, myList, progress
- /api/user  → profile, password, watchlist, history (all protected)"
echo "✅ Routes committed"
echo ""

# ──────────────────────────────────────────
# STEP 8 — BACKEND SERVER
# ──────────────────────────────────────────
echo "▶ STEP 8: Commit Express server entry point..."
git add backend/src/server.ts
git commit -m "feat(backend): add Express server with MongoDB Atlas connection

- CORS configured for localhost:3000
- Health check endpoint /api/health
- MongoDB Atlas connect via mongoose"
echo "✅ Server committed"
echo ""

# ──────────────────────────────────────────
# STEP 9 — SEED DATA
# ──────────────────────────────────────────
echo "▶ STEP 9: Commit database seed script..."
git add backend/src/seed.ts
git commit -m "feat(backend): add seed script with 8 movies/series

Seeded titles: Stranger Things, Squid Game, Money Heist,
The Witcher, The Crown, Extraction, Inception, Bird Box"
echo "✅ Seed script committed"
echo ""

# ──────────────────────────────────────────
# STEP 10 — FRONTEND INIT
# ──────────────────────────────────────────
echo "▶ STEP 10: Commit frontend project setup..."
git add frontend/package.json frontend/tsconfig.json frontend/tailwind.config.js frontend/postcss.config.js frontend/.env.example frontend/public/
git commit -m "chore(frontend): init React 18 + TypeScript + Tailwind CSS project

- Tailwind with custom netflix color palette
- PostCSS config
- Public index.html with Inter font"
echo "✅ Frontend init committed"
echo ""

# ──────────────────────────────────────────
# STEP 11 — FRONTEND TYPES & SERVICES
# ──────────────────────────────────────────
echo "▶ STEP 11: Commit types and API service..."
git add frontend/src/types/ frontend/src/services/
git commit -m "feat(frontend): add TypeScript types and Axios API service

- Movie, User, AuthResponse, ApiResponse interfaces
- Axios instance with JWT interceptor (auto-attach token)
- authAPI, movieAPI, userAPI service functions
- Auto-redirect to /login on 401 response"
echo "✅ Types and API service committed"
echo ""

# ──────────────────────────────────────────
# STEP 12 — CONTEXT
# ──────────────────────────────────────────
echo "▶ STEP 12: Commit React context providers..."
git add frontend/src/context/
git commit -m "feat(frontend): add AuthContext and MovieContext

- AuthContext: login, register, logout, updateUser with localStorage
- MovieContext: myList, toggleMyList, isInMyList, selectedMovie"
echo "✅ Context committed"
echo ""

# ──────────────────────────────────────────
# STEP 13 — COMPONENTS
# ──────────────────────────────────────────
echo "▶ STEP 13: Commit shared UI components..."
git add frontend/src/components/
git commit -m "feat(frontend): add all shared UI components

- Navbar: scrolled BG, live search dropdown, profile dropdown
- Hero: auto-sliding carousel with progress dots, Play + My List CTA
- MovieRow: horizontal scroll with arrow navigation
- MovieCard: Netflix-style hover card with info overlay
- Footer: links, language selector"
echo "✅ Components committed"
echo ""

# ──────────────────────────────────────────
# STEP 14 — AUTH PAGES
# ──────────────────────────────────────────
echo "▶ STEP 14: Commit auth pages..."
git add frontend/src/pages/LandingPage.tsx frontend/src/pages/LoginPage.tsx frontend/src/pages/RegisterPage.tsx
git commit -m "feat(frontend): add Landing, Login, and Register pages

- LandingPage: hero, feature sections, FAQ with dark Netflix style
- LoginPage: form with error handling, JWT login flow
- RegisterPage: validation, auto-login after register"
echo "✅ Auth pages committed"
echo ""

# ──────────────────────────────────────────
# STEP 15 — MAIN BROWSE PAGES
# ──────────────────────────────────────────
echo "▶ STEP 15: Commit main browse pages..."
git add frontend/src/pages/HomePage.tsx frontend/src/pages/MoviesPage.tsx frontend/src/pages/TVShowsPage.tsx
git commit -m "feat(frontend): add Home, Movies, and TV Shows pages

- HomePage: hero carousel + genre rows (trending, new, action, drama, sci-fi)
- MoviesPage: grid with genre filter pills
- TVShowsPage: grid with genre filter pills, series-only filter"
echo "✅ Browse pages committed"
echo ""

# ──────────────────────────────────────────
# STEP 16 — WATCH PAGE
# ──────────────────────────────────────────
echo "▶ STEP 16: Commit video watch page..."
git add frontend/src/pages/WatchPage.tsx
git commit -m "feat(frontend): add full custom video player page

- HTML5 video with custom controls overlay
- Play/pause, skip ±10s, progress bar, volume slider
- Fullscreen toggle, auto-hide controls
- Auto-saves watch progress to backend every 30s
- Buffering spinner indicator"
echo "✅ Watch page committed"
echo ""

# ──────────────────────────────────────────
# STEP 17 — USER PAGES
# ──────────────────────────────────────────
echo "▶ STEP 17: Commit user pages..."
git add frontend/src/pages/MyListPage.tsx frontend/src/pages/NewPage.tsx frontend/src/pages/ProfilePage.tsx
git commit -m "feat(frontend): add MyList, New & Popular, and Profile pages

- MyListPage: grid of saved movies, empty state
- NewPage: Top 10 trending with rank badges, new releases list
- ProfilePage: change name/avatar picker, change password form"
echo "✅ User pages committed"
echo ""

# ──────────────────────────────────────────
# STEP 18 — APP ENTRY & ROUTING
# ──────────────────────────────────────────
echo "▶ STEP 18: Commit App.tsx routing and entry files..."
git add frontend/src/App.tsx frontend/src/index.tsx frontend/src/index.css
git commit -m "feat(frontend): add routing, entry point, and global styles

- React Router v6 with PrivateRoute and PublicRoute guards
- 10 routes: /, /login, /register, /home, /movies, /tv-shows,
  /watch/:id, /my-list, /new, /profile
- Tailwind base styles + scrollbar-hide utility"
echo "✅ Routing and entry committed"
echo ""

# ──────────────────────────────────────────
# PUSH TO GITHUB
# ──────────────────────────────────────────
echo "▶ FINAL STEP: Pushing all commits to GitHub..."
git branch -M main
git push -u origin main
echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  ✅ ALL DONE! Your repo is live on GitHub            ║"
echo "║                                                      ║"
echo "║  Next steps:                                         ║"
echo "║  1. cd backend && cp .env.example .env              ║"
echo "║     → Fill MONGODB_URI and JWT_SECRET               ║"
echo "║  2. cd backend && npm install && npm run seed       ║"
echo "║  3. cd frontend && npm install                      ║"
echo "║  4. cd .. && npm install && npm run dev             ║"
echo "║                                                      ║"
echo "║  Frontend: http://localhost:3000                     ║"
echo "║  Backend:  http://localhost:5001/api/health          ║"
echo "╚══════════════════════════════════════════════════════╝"
