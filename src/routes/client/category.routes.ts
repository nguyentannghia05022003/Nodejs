import { Router } from 'express';
import { ClientCategoryController } from '../../controllers/client/category.controller';

const router = Router();
const controller = new ClientCategoryController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

export default router;

