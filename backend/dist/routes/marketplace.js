// backend/src/routes/marketplace.ts
import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { handleCreateListing, handleGetListings, handleUpdateListing, handleDeleteListing, handleGetMyListings, handleReportListing } from '../controllers/marketplaceController.js';
const router = Router();
// --- Marketplace Item Routes ---
router.get('/items/my-listings', checkAuth, handleGetMyListings);
router.get('/items', checkAuth, handleGetListings);
router.post('/items', checkAuth, handleCreateListing);
router.patch('/items/:itemId', checkAuth, handleUpdateListing);
router.delete('/items/:itemId', checkAuth, handleDeleteListing);
router.post('/items/:itemId/report', checkAuth, handleReportListing);
export default router;
