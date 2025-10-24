// backend/src/routes/auth.ts
import { Router } from 'express';
import { handleStudentSignup, handleStudentLogin, handleForgotPassword, handleUpdateProfile } from '../controllers/authController.js';
import { checkAuth } from '../middlewares/checkAuth.js';
const router = Router();
// --- Public Routes (No middleware needed) ---
router.post('/student-signup', handleStudentSignup);
router.post('/student-login', handleStudentLogin);
router.post('/forgot-password', handleForgotPassword);
// --- Protected Route (Middleware is applied here) ---
router.patch('/update-profile', checkAuth, handleUpdateProfile);
export default router;
