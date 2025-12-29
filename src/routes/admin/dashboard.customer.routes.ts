import { Router } from 'express';
import { DashboardCustomerController } from '../../controllers/admin/dashboard.customer.controller';

const router = Router();
const controller = new DashboardCustomerController();

// router.get('/customers', controller.getCustomerDashboard);
router.get('/customers/top-orders', controller.getTopCustomersByOrderCount);
router.get('/customers/top-revenue', controller.getTopCustomersByRevenue);
router.get('/customers/purchase-cycles', controller.getPurchaseCycles);

export default router;

