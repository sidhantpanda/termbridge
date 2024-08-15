import { Router } from 'express';
import getHosts from './get-hosts';
import addHost from './add-host';

export const configRouter = Router();

// configRouter.get('/hosts', getHosts);

configRouter.get('/remote-hosts', getHosts);
configRouter.post('/add-host', addHost);
