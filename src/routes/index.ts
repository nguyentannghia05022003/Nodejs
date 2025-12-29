import { Router } from 'express';
import adminRoutes from './admin';
import clientRoutes from './client';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/customer', clientRoutes);

export default router;