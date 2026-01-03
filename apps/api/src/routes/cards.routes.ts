import { Router } from 'express';
import {
  meController,
  projectsController,
  skillsController,
  contactController,
  resumeController,
  funController,
} from '../controllers/cards.controller';

const router = Router();

router.get('/me', meController);
router.get('/projects', projectsController);
router.get('/skills', skillsController);
router.get('/contact', contactController);
router.get('/resume', resumeController);
router.get('/fun', funController);

export default router;

