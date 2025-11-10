import { Router } from "express";
import adminRoutes from "./admin";


const router = Router();

// API Admin
router.use("/admin", adminRoutes);

export default router;