# iyf-s10-week-10-Kimiti4
# Jamii Link KE — Unified Backend + Frontend 🇰🇪

*One repository, one server, one platform for Mtaani alerts, Skill swaps, Farm markets & Gigs*

## Author
- **Name:** Amos Kimiti
- **GitHub:** [@Kimiti4](https://github.com/Kimiti4)
- **Date:** April 28, 2026

---

## 🎯 Vision

> "A farmer in Kiambu can see tomato prices in Nairobi markets, find a carpenter for farm repairs, and get flood alerts for their settlement — all in one platform."

**Jamii Link KE** unifies four community needs into one interconnected platform:
- 📢 **Mtaani Connect** — Hyperlocal alerts for informal settlements (water cuts, power outages)
- 💡 **SkillSwap KE** — Time-banking skill exchanges without cash
- 🌾 **FarmLink KE** — Direct farm-to-buyer marketplace with price transparency
- 💼 **Gigs Board** — Local daily job opportunities

---

## 🏗️ Monorepo Architecture

```
iyf-s10-week-10-Kimiti4/
├── public/                 # 🌐 Frontend (Vanilla JS SPA)
│   ├── index.html         # Single-page app entry
│   ├── manifest.json      # PWA configuration
│   ├── css/
│   │   └── styles.css     # Responsive Kenyan-themed UI
│   └── js/
│       ├── api.js         # API client (relative /api paths)
│       └── app.js         # Frontend app logic (views, routing, DOM)
├── src/                   # ⚙️ Backend (Node.js + Express)
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic + filtering
│   ├── middleware/        # Logger, errorHandler, validation, auth
│   ├── data/
│   │   └── store.js       # In-memory store (MongoDB-ready)
│   ├── utils/
│   │   └── asyncHandler.js
│   └── app.js             # Express config (serves /public!)
├── server.js              # Entry point
├── package.json           # Single dependencies file
├── .env                   # Environment variables
├── daily-challenges.test.js
└── README.md              # You are here
```

---

## 🚀 Quick Start (One Command)

```bash
# Clone & install
cd iyf-s10-week-10-Kimiti4
npm install

# Start BOTH backend + frontend together
npm run dev
```

**Open:** http://localhost:3000

That's it! Express serves your frontend HTML/CSS/JS automatically from the `public/` folder. No separate frontend server needed.

---

## 📡 API Endpoints (for developers)

### Unified Posts
```http
GET    /api/posts               # List all posts with filters
GET    /api/posts/:id           # Get single post
GET    /api/posts/:id/comments  # Get comments (nested)
POST   /api/posts               # Create post (auth required)
PUT    /api/posts/:id           # Update post
DELETE /api/posts/:id           # Delete post
PATCH  /api/posts/:id/engage    # Like or upvote
POST   /api/posts/:id/comments  # Add comment
DELETE /api/posts/:id/comments/:commentId
```

**Filtering options:** `?category=farm&county=Kiambu&crop=Tomatoes&sort=popular&search=tomato&tag=organic`

### Market Prices (FarmLink)
```http
GET /api/market/prices?crop=Tomatoes&county=Nairobi
# Returns farm gate vs market prices → empowers farmer negotiation
```

### Locations (Geo-filtering)
```http
GET /api/locations
# Returns all settlements, zones, counties
```

### Health Check
```http
GET /api/health
```

---

## 🖥️ Frontend Features

### Explore Page (`/`)
- **Category filter:** Mtaani | Skill | Farm | Gig | Alert
- **Location filter:** County (Nairobi, Kiambu, Machakos…)
- **Search bar:** Full-text search across titles, content, tags, crops, skills
- **Sort options:** Newest | Popular | Urgent
- **Post cards:** Auto-display relevant metadata (price, crop, skill hours, urgency badge)
- **Like/upvote buttons** (coming soon)

### Market Page (`/#market`)
- **Crop selector:** Auto-populated from farm posts
- **County selector:** Filter by region
- **Price cards:** Color-coded (green=farm gate / red=market)
- **Farmer tip:** "Compare farm gate vs market prices to negotiate better"

### Create Page (`/#create`)
- **Form fields:** Title, Content, Author, Category, Tags, County
- **Live validation:** Min lengths enforced
- **Success/error messages:** Instant feedback
- **Auth simulation:** Uses demo Bearer token

### About Page (`/#about`)
- Project vision & impact metrics
- 4 pillars explained
- Why it matters for Kenya

### Responsive Design
- Mobile-first CSS
- Works on feature phones & tablets
- Offline-capable PWA (manifest.json included)

---

## 🔐 Authentication (Demo)

Currently uses a simulated Bearer token. To make a POST/PUT/DELETE:

```javascript
// In browser console
localStorage.setItem('auth_token', 'jamii-link-ke-2026');

// Or include header:
Authorization: Bearer jamii-link-ke-2026
```

In production, replace `src/middleware/requireAuth.js` with real JWT or session auth.

---

## 🛠️ Technology Stack

| Layer | Tech |
|-------|------|
| **Backend** | Node.js 18+, Express 4.x |
| **Frontend** | Vanilla JS (ES6+), HTML5, CSS3 |
| **Storage** | In-memory (MongoDB-ready structure) |
| **Env** | dotenv for configuration |
| **Dev** | nodemon for hot reload |

---

## 📊 Data Model

### Posts (Unified)
```javascript
{
  id, title, content, author, category, // 'mtaani' | 'skill' | 'farm' | 'gig' | 'alert'
  location: { county, settlement?, zone?, ward?, coordinates? },
  tags: [],
  metadata: {
    // Farm: crop, variety, quantity, unit, pricePerUnit, harvestDate
    // Skill: offeredSkill, offeredHours, requestedSkill
    // Gig: gigType, budget, currency, deadline
    // Mtaani: affectedHouseholds, alternativeSource
  },
  urgency: 'low' | 'medium' | 'high' | 'critical', // for alerts
  createdAt, likes, upvotes, views
}
```

### Comments (Nested)
```javascript
{ id, postId, content, author, createdAt }
```

### Market Prices
```javascript
{ crop, county, pricePerKg, source, updatedAt }
```

---

## ✅ Week 10 Tasks Completed

- [x] Node.js basics: ran scripts outside browser (hello.js, exercise-modules.js)
- [x] Built Express server with routing
- [x] Handled route params (`:id`) and query strings (`?category=farm&county=Kiambu`)
- [x] Sent JSON responses with proper status codes (200, 201, 400, 404, 500)
- [x] Full CRUD API for unified posts
- [x] Middleware: logger, errorHandler, validation, auth simulation
- [x] Routes/controllers/middleware separation pattern
- [x] Environment variables with dotenv
- [x] Combined backend + frontend into **single repository**
- [x] Served frontend statically from Express (`express.static`)
- [x] Implemented SPA fallback (catch-all `*` route)
- [x] Frontend uses **relative API paths** (`/api/...`)
- [x] All 5 Daily Challenges implemented and tested

---

## 🧪 Testing

### Run automated test (Daily Challenges)
```bash
npm test
# Tests Day 1–5 endpoints automatically
```

### Manual API tests
```bash
# Health check
curl http://localhost:3000/api/health

# Get all farm posts
curl "http://localhost:3000/api/posts?category=farm"

# Filter by county
curl "http://localhost:3000/api/posts?county=Kiambu"

# Get market prices
curl "http://localhost:3000/api/market/prices?crop=Tomatoes"

# Get comments for post 1
curl http://localhost:3000/api/posts/1/comments
```

### Frontend UI test
1. Open http://localhost:3000
2. Click **Explore** → see posts
3. Filter by "Farm" → see farm produce
4. Click **Market** → see price comparison
5. Click **Create** → fill form → submit → returns to Explore with new post

---

## 🌍 Why This Matters for Kenya

| Problem | Jamii Link KE Solution |
|---------|------------------------|
| Farmers exploited by brokers | 📊 FarmLink price transparency → know fair market price |
| Youth idle, no cash for services | 💡 SkillSwap → trade skills without money |
| Informal settlements ignored | 📢 Mtaani alerts → community-powered safety info |
| Daily wage workers miss gigs | 💼 Gigs board → find work today, get paid today |
| Siloed communities | 🔗 Unified platform → one app for all needs |

---

## 🚀 Next Steps (Week 11+)

1. **MongoDB Integration** – Replace in-memory store
2. **M-Pesa API** – Accept payments for farm produce & gigs
3. **SMS Fallback** – Twilio integration for low-data users
4. **Geolocation** – "Posts near me" via GPS coordinates
5. **User Auth** – Real JWT + password hashing (bcrypt)
6. **Image Uploads** – Farm produce photos, ID verification
7. **Mobile App** – React Native or Capacitor wrapper
8. **Admin Dashboard** – Moderate posts, view analytics

---

## 🏆 Project Checklist

| ✅ | Item |
|----|------|
| ✅ | Single repository (backend + frontend) |
| ✅ | Express serves `/public` folder (`express.static`) |
| ✅ | SPA fallback route (`app.get('*')`) |
| ✅ | Frontend uses **relative API URLs** (`/api/posts`) |
| ✅ | "Jamii Link KE" branding everywhere |
| ✅ | Responsive CSS (works on phone & desktop) |
| ✅ | All 5 daily challenges completed |
| ✅ | One-command startup: `npm run dev` |
| ✅ | Test suite passes (`npm test`) |

---

## 📖 Resources

- **Node.js docs:** https://nodejs.org/api/
- **Express guide:** https://expressjs.com/
- **MDN fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Kenya ICT Authority:** https://www.ict.go.ke/

---

<sub>Built with ❤️ for IYF Summer 2026 • [View Source](https://github.com/Kimiti4/iyf-s10-week-10-Kimiti4) • **Jamii Link KE** — Kenya's community platform 🔗🇰🇪</sub>
