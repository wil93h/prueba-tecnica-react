import { Router } from 'express';
import { PersonController } from '../infrastructure/controllers/PersonController';
import { uploadMiddleware } from '../infrastructure/middlewares/UploadMiddleware';

const router = Router();
const controller = new PersonController();

// Create
router.post(
  '/persons',
  uploadMiddleware.single('docPhoto'),
  controller.register.bind(controller)
);

// Read All
router.get('/persons', controller.getAll.bind(controller));

// Read One
router.get('/persons/:id', controller.getById.bind(controller));

// Update
router.put(
  '/persons/:id',
  uploadMiddleware.single('docPhoto'),
  controller.update.bind(controller)
);

// Delete
router.delete('/persons/:id', controller.delete.bind(controller));

export default router;