import { Router } from 'express';
import { personalInfoController } from '../controllers/personal.controller';

const router = Router();

router.get('/', personalInfoController);

export default router;

