import { Router } from 'express';
import { DashboardCategoryController } from '../../controllers/admin/dashboard.category.controller';

const router = Router();
const controller = new DashboardCategoryController();

router.get('/categories', controller.getCategoryDashboard);

export default router;

