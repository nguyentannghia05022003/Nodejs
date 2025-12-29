import { Router } from 'express';
import { adminAuthMiddleware } from '../../middlewares/admin-auth.middleware';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import adminRoutes from './admin.routes';
import customerRoutes from './customer.routes';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import orderRoutes from './order.routes';
import uploadRoutes from './upload.routes';
import dashboardCustomerRoutes from './dashboard.customer.routes';
import dashboardCategoryRoutes from './dashboard.category.routes';
import dashboardProductRoutes from './dashboard.product.routes';
import dashboardOrderRoutes from './dashboard.order.routes';

const router = Router();

router.use('/auth', authRoutes);

router.use('/profile', adminAuthMiddleware, profileRoutes);
router.use('/users', adminAuthMiddleware, adminRoutes);
router.use('/customers', adminAuthMiddleware, customerRoutes);
router.use('/products', adminAuthMiddleware, productRoutes);
router.use('/categories', adminAuthMiddleware, categoryRoutes);
router.use('/orders', adminAuthMiddleware, orderRoutes);
router.use('/upload', adminAuthMiddleware, uploadRoutes);
router.use('/dashboard', adminAuthMiddleware, dashboardCustomerRoutes);
router.use('/dashboard', adminAuthMiddleware, dashboardCategoryRoutes);
router.use('/dashboard', adminAuthMiddleware, dashboardProductRoutes);
router.use('/dashboard', adminAuthMiddleware, dashboardOrderRoutes);

export default router;