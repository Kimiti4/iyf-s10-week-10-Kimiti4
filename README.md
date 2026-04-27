# iyf-s10-week-10-Kimiti4
# Week 10: Jamii Link KE Backend 🇰🇪

*Unified platform connecting Mtaani alerts, Skill swaps, Farm markets & Gigs*

## Author
- **Name:** Amos Kimiti
- **GitHub:** [@Kimiti4](https://github.com/Kimiti4)
- **Date:** April 21, 2026

## 🎯 Vision
> "A farmer in Kiambu can see tomato prices in Nairobi markets, find a carpenter for farm repairs, and get flood alerts for their settlement — all in one platform."

Jamii Link KE breaks silos between community needs by unifying:
- 📢 **Mtaani Connect**: Hyperlocal alerts for informal settlements
- 💡 **SkillSwap KE**: Time-banking for skill exchanges
- 🌾 **FarmLink KE**: Direct farm-to-buyer marketplace with price transparency
- 💼 **Gigs Board**: Local job opportunities

## 🛠️ Technologies
- Node.js 18+ | Express.js 4.x | dotenv | cors
- In-memory store (ready for MongoDB migration)
- RESTful API design with filtering, pagination, nested resources

## 🚀 Quick Start
```bash
git clone https://github.com/Kimiti4/iyf-s10-week-10-Kimiti4.git
cd iyf-s10-week-10-Kimiti4
npm install
cp .env.example .env
npm run dev
# → Visit http://localhost:3000
```

## 📡 API Endpoints

### Unified Posts (Core)
```http
GET  /api/posts?category=farm&county=Kiambu&crop=Tomatoes&sort=popular
GET  /api/posts/:id?comments=true
POST /api/posts          (requires Authorization header)
PUT  /api/posts/:id      (requires Authorization)
DELETE /api/posts/:id    (requires Authorization)
PATCH /api/posts/:id/engage?type=upvote
```

### Comments (Nested Resource)
```http
GET    /api/posts/:id/comments
POST   /api/posts/:id/comments  (requires Authorization)
DELETE /api/posts/:id/comments/:commentId (requires Authorization)
```

### Market Intelligence (FarmLink Price Transparency)
```http
GET /api/market/prices?crop=Tomatoes&county=Nairobi
# Response shows farm gate vs market prices → empowers farmer negotiation
```

### Locations (Geo-Filtering)
```http
GET /api/locations
# Returns settlements, zones, counties for filtering posts
```

### Utilities
```http
GET /api/health  # Server status
GET /            # API documentation
```

## 🧪 Test the API
```bash
# Health check
curl http://localhost:3000/api/health

# Get farm posts in Kiambu
curl "http://localhost:3000/api/posts?category=farm&county=Kiambu"

# Compare tomato prices (farmer empowerment!)
curl "http://localhost:3000/api/market/prices?crop=Tomatoes"

# Create a post (with demo auth)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "title": "Water Alert: Soweto Zone 3",
    "content": "Water off tomorrow 8AM-4PM",
    "author": "Kibera Chief",
    "category": "mtaani",
    "location": { "settlement": "kibera", "zone": "soweto-zone-3" },
    "urgency": "high",
    "tags": ["water", "alert"]
  }'

# Run daily challenges test
npm test
```

## 📊 Social Impact by Design
| Feature | Community Benefit |
|---------|------------------|
| `category=farm` + `/market/prices` | Farmers see fair prices → better negotiation |
| `category=mtaani` + `urgency=high` | Critical alerts reach residents faster |
| `category=skill` + metadata.offeredSkill | Youth trade skills without cash |
| Geo-filtering by `settlement/zone` | Hyperlocal relevance for informal settlements |
| Unified search across categories | Farmers discover gigs; residents find skills |

## 🗂️ Project Structure
```
src/
├── routes/          # API endpoints (posts, market, locations)
├── controllers/     # Business logic (filtering, validation)
├── middleware/      # Logger, errorHandler, validate, requireAuth
├── data/store.js    # In-memory store (structured for MongoDB)
├── utils/           # asyncHandler helper
└── app.js           # Express configuration
```

## ✅ Week 10 Checklist
- [x] Ran JavaScript with Node.js outside browser
- [x] Used built-in modules: `fs`, `path`, `process`
- [x] Created Express server with routing
- [x] Handled route params (`:id`) and query strings (`?category=farm`)
- [x] Sent JSON responses with status codes (200, 201, 400, 404, 500)
- [x] Built full CRUD API for unified posts
- [x] Created middleware: logger, errorHandler, validate, requireAuth
- [x] Organized code with routes/controllers/middleware separation
- [x] Used environment variables with dotenv
- [x] Tested API with curl/Postman
- [x] Completed all 5 daily challenges
- [x] Designed for real Kenyan context (settlements, counties, crops)

## 🌍 Why This Matters for Kenya
1. **Financial Inclusion**: Farmers see market prices → reduce broker exploitation
2. **Youth Empowerment**: Skill swaps create opportunities without cash
3. **Community Resilience**: Hyperlocal alerts save lives during emergencies
4. **Digital Bridge**: Connects informal settlements to formal opportunities
5. **Scalable Foundation**: In-memory → MongoDB → M-Pesa → Mobile App

## 🚀 Next Steps (Week 11+)
1. Replace in-memory store with MongoDB
2. Add M-Pesa integration for farm transactions
3. Build React frontend with offline support
4. Add SMS fallback via Twilio for low-data users
5. Implement geolocation for "posts near me"

---

<sub>Built with ❤️ for IYF Summer 2026 • [View Source](https://github.com/Kimiti4/iyf-s10-week-10-Kimiti4)</sub>
