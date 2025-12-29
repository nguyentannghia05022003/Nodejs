import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import categoryRoutes from './category.routes';
import orderRoutes from './order.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/upload', uploadRoutes);

export default router;
