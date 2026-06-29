# 📋 Step-by-Step Git Commands — Netflux Clone

Copy-paste tiap step satu per satu ke terminal.

---

## 🔧 PERSIAPAN — Buat repo di GitHub dulu

1. Buka [github.com/new](https://github.com/new)
2. Repository name: `netflix-clone`
3. Visibility: Public atau Private
4. **Jangan** centang "Add README" (biarkan kosong)
5. Klik **Create repository**
6. Copy URL repo lo (contoh: `https://github.com/erick123/netflix-clone.git`)

---

## ▶ STEP 1 — Masuk folder & init git

```bash
cd netflix-clone
git init
git remote add origin https://github.com/YOUR_USERNAME/netflix-clone.git
```

---

## ▶ STEP 2 — Root config files

```bash
git add .gitignore package.json README.md
git commit -m "chore: add root config, gitignore, and README"
```

---

## ▶ STEP 3 — Backend project setup

```bash
git add backend/package.json backend/tsconfig.json backend/.env.example
git commit -m "chore(backend): init Node.js + Express + TypeScript project"
```

---

## ▶ STEP 4 — Database models

```bash
git add backend/src/models/
git commit -m "feat(backend): add User and Movie mongoose models

- User: name, email, bcrypt password, avatar, myList, watchHistory
- Movie: full schema with genre, type, ratings, URLs, cast, flags"
```

---

## ▶ STEP 5 — Middleware & types

```bash
git add backend/src/middleware/ backend/src/types/
git commit -m "feat(backend): add JWT auth middleware and error handler

- protect() middleware verifies Bearer token
- errorHandler and notFound middleware
- AuthRequest and JwtPayload TypeScript types"
```

---

## ▶ STEP 6 — Controllers

```bash
git add backend/src/controllers/
git commit -m "feat(backend): add auth, movie, and user controllers

- authController: register, login, getMe with JWT signing
- movieController: getAll, trending, featured, search, myList, progress
- userController: getMyList, watchHistory, updateProfile, changePassword"
```

---

## ▶ STEP 7 — API Routes

```bash
git add backend/src/routes/
git commit -m "feat(backend): add REST API routes

- /api/auth  → register, login, me
- /api/movies → CRUD, search, trending, featured, myList, progress
- /api/user  → profile, password, watchlist, history (all protected)"
```

---

## ▶ STEP 8 — Express server

```bash
git add backend/src/server.ts
git commit -m "feat(backend): add Express server with MongoDB Atlas connection

- CORS configured for localhost:3000
- Health check endpoint /api/health
- MongoDB Atlas connect via mongoose"
```

---

## ▶ STEP 9 — Seed script

```bash
git add backend/src/seed.ts
git commit -m "feat(backend): add seed script with 8 movies/series

Seeded titles: Stranger Things, Squid Game, Money Heist,
The Witcher, The Crown, Extraction, Inception, Bird Box"
```

---

## ▶ STEP 10 — Frontend project setup

```bash
git add frontend/package.json frontend/tsconfig.json frontend/tailwind.config.js frontend/postcss.config.js frontend/.env.example frontend/public/
git commit -m "chore(frontend): init React 18 + TypeScript + Tailwind CSS project

- Tailwind with custom netflix color palette
- PostCSS config
- Public index.html with Inter font"
```

---

## ▶ STEP 11 — Types & API service

```bash
git add frontend/src/types/ frontend/src/services/
git commit -m "feat(frontend): add TypeScript types and Axios API service

- Movie, User, AuthResponse, ApiResponse interfaces
- Axios instance with JWT interceptor (auto-attach token)
- authAPI, movieAPI, userAPI service functions
- Auto-redirect to /login on 401 response"
```

---

## ▶ STEP 12 — React context

```bash
git add frontend/src/context/
git commit -m "feat(frontend): add AuthContext and MovieContext

- AuthContext: login, register, logout, updateUser with localStorage
- MovieContext: myList, toggleMyList, isInMyList, selectedMovie"
```

---

## ▶ STEP 13 — Shared UI components

```bash
git add frontend/src/components/
git commit -m "feat(frontend): add all shared UI components

- Navbar: scrolled BG, live search dropdown, profile dropdown
- Hero: auto-sliding carousel with progress dots, Play + My List CTA
- MovieRow: horizontal scroll with arrow navigation
- MovieCard: Netflix-style hover card with info overlay
- Footer: links, language selector"
```

---

## ▶ STEP 14 — Auth pages

```bash
git add frontend/src/pages/LandingPage.tsx frontend/src/pages/LoginPage.tsx frontend/src/pages/RegisterPage.tsx
git commit -m "feat(frontend): add Landing, Login, and Register pages

- LandingPage: hero, feature sections, FAQ with dark Netflix style
- LoginPage: form with error handling, JWT login flow
- RegisterPage: validation, auto-login after register"
```

---

## ▶ STEP 15 — Browse pages

```bash
git add frontend/src/pages/HomePage.tsx frontend/src/pages/MoviesPage.tsx frontend/src/pages/TVShowsPage.tsx
git commit -m "feat(frontend): add Home, Movies, and TV Shows pages

- HomePage: hero carousel + genre rows (trending, new, action, drama, sci-fi)
- MoviesPage: grid with genre filter pills
- TVShowsPage: grid with genre filter pills, series-only filter"
```

---

## ▶ STEP 16 — Video watch page

```bash
git add frontend/src/pages/WatchPage.tsx
git commit -m "feat(frontend): add full custom video player page

- HTML5 video with custom controls overlay
- Play/pause, skip ±10s, progress bar, volume slider
- Fullscreen toggle, auto-hide controls
- Auto-saves watch progress to backend every 30s
- Buffering spinner indicator"
```

---

## ▶ STEP 17 — User pages

```bash
git add frontend/src/pages/MyListPage.tsx frontend/src/pages/NewPage.tsx frontend/src/pages/ProfilePage.tsx
git commit -m "feat(frontend): add MyList, New and Popular, and Profile pages

- MyListPage: grid of saved movies, empty state
- NewPage: Top 10 trending with rank badges, new releases list
- ProfilePage: change name/avatar picker, change password form"
```

---

## ▶ STEP 18 — App routing & entry

```bash
git add frontend/src/App.tsx frontend/src/index.tsx frontend/src/index.css
git commit -m "feat(frontend): add routing, entry point, and global styles

- React Router v6 with PrivateRoute and PublicRoute guards
- 10 routes: /, /login, /register, /home, /movies, /tv-shows,
  /watch/:id, /my-list, /new, /profile
- Tailwind base styles + scrollbar-hide utility"
```

---

## ▶ STEP 19 — Push semua ke GitHub 🚀

```bash
git branch -M main
git push -u origin main
```

---

## ✅ Verifikasi di GitHub

Setelah push, lo harusnya lihat **18 commits** di repo dengan history yang rapi seperti ini:

```
feat(frontend): add routing, entry point, and global styles
feat(frontend): add MyList, New and Popular, and Profile pages
feat(frontend): add full custom video player page
feat(frontend): add Home, Movies, and TV Shows pages
feat(frontend): add Landing, Login, and Register pages
feat(frontend): add all shared UI components
feat(frontend): add AuthContext and MovieContext
feat(frontend): add TypeScript types and Axios API service
chore(frontend): init React 18 + TypeScript + Tailwind CSS project
feat(backend): add seed script with 8 movies/series
feat(backend): add Express server with MongoDB Atlas connection
feat(backend): add REST API routes
feat(backend): add auth, movie, and user controllers
feat(backend): add JWT auth middleware and error handler
feat(backend): add User and Movie mongoose models
chore(backend): init Node.js + Express + TypeScript project
chore: add root config, gitignore, and README
```

---

## 🏃 Jalankan project setelah push

```bash
# 1. Setup backend env
cd backend
cp .env.example .env
# Edit .env → isi MONGODB_URI dan JWT_SECRET

# 2. Install & seed
npm install
npm run seed

# 3. Install frontend
cd ../frontend
npm install

# 4. Jalankan keduanya (dari root)
cd ..
npm install
npm run dev
```

Buka: **http://localhost:3000**
