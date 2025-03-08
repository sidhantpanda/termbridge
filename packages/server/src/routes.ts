import { Router } from 'express';

import { remotesRouter } from './api/remotes';
import { dockerRouter } from './api/docker';

const router = Router();

router.use('/remotes', remotesRouter);
router.use('/docker', dockerRouter);

export default router;
