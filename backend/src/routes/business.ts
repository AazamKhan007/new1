// routes/businessRoute.ts
import { Router } from "express";
import BusinessControl from "../controllers/bussinessController.js";

const router = Router();

// Sign-up endpoint
router.use("/businessloginInSignin", BusinessControl);

// Login endpoint


export default router;
