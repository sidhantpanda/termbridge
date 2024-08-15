import { Router } from 'express';
import getHosts from './get-hosts';

export const configRouter = Router();

// configRouter.get('/hosts', getHosts);

configRouter.get('/remote-hosts', getHosts);


