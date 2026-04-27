/**
 * 🔹 Express App Configuration
 * Centralized middleware and routing
 */
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

// Trust proxy for deployment
app.set('trust proxy', 1);

// Middleware
app.use(cors()); // Enable frontend connections
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(logger); // Request logging

// API Routes
app.use('/api', routes);

// Root info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Jamii Link KE API',
    version: '1.0.0',
    description: 'Unified platform for Mtaani alerts, Skill swaps, Farm markets & Gigs',
    categories: ['mtaani', 'skill', 'farm', 'gig', 'alert'],
    endpoints: {
      health: 'GET /api/health',
      posts: 'GET /api/posts?category=farm&location=Kiambu',
      market: 'GET /api/market/prices?crop=tomato',
      docs: 'See README.md'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    hint: 'Try /api/posts, /api/market/prices, or /api/health'
  });
});

// Error Handler (must be last)
app.use(errorHandler);

module.exports = app;
