import { Router } from 'express';
import { DashboardProductController } from '../../controllers/admin/dashboard.product.controller';

const router = Router();
const controller = new DashboardProductController();

router.get('/products', controller.getProductsDashboard);

export default router;

