import { Router } from 'express';

import {remotesRouter} from './api/remotes';

const router = Router();

router.use('/remotes', remotesRouter);

export default router;
