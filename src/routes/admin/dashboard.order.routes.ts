import { Router } from 'express';
import { DashboardOrderController } from '../../controllers/admin/dashboard.order.controller';

const router = Router();
const controller = new DashboardOrderController();

router.get('/orders/by-date', controller.getRevenueByDate);
router.get('/orders/by-status', controller.getRevenueByStatus);
router.get('/orders/today-comparison', controller.getTodayComparison);

export default router;

