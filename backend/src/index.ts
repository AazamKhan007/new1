import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

// Import all route handlers
import authRoutes from './routes/auth.js';
import marketplaceRoutes from './routes/marketplace.js';
import businessRoutes from './routes/business.js'; // Added teammate's business routes

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/business', businessRoutes); // Added teammate's business routes

// Server Initialization
app.get('/', (req: Request, res: Response) => {
  res.send('CampSum Backend Server is running!');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
