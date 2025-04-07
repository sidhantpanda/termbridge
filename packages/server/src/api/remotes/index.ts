import { Router } from 'express';
import getRemotes from './get-all';
import getRemoteById from './get-by-id';
import removeRemote from './remove';
import createOrUpdate from './create-or-update';
import getTailscaleInfo from './get-tailscale-info';

export const remotesRouter = Router();

remotesRouter.get('/all', getRemotes);
remotesRouter.get('/:id', getRemoteById);
remotesRouter.get('/:id/info/tailscale', getTailscaleInfo);
remotesRouter.delete('/:id', removeRemote);
remotesRouter.put('/new', createOrUpdate);
remotesRouter.put('/:id', createOrUpdate);