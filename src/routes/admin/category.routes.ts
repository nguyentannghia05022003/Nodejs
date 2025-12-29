import { Router } from 'express';
import { validateDto } from '../../middlewares/validation.middleware';
import { CategoryController } from '../../controllers/admin/category.controller';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../../models/dto/category.dto';

const router = Router();
const controller = new CategoryController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/', validateDto(CreateCategoryDTO), controller.create);
router.put('/:id', validateDto(UpdateCategoryDTO), controller.update);
router.delete('/:id', controller.delete);

export default router;

