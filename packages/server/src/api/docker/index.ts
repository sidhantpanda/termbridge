import { Router } from 'express';
import getContainers from './get-containers';

export const dockerRouter = Router();

dockerRouter.get('/:id/ps', getContainers);