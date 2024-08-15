import { Router } from 'express';

import {configRouter} from './api/config/';

const router = Router();

router.use('/config', configRouter);

export default router;
