import { Router } from 'express';
import getRemotes from './get-all';
import addRemote from './add';
import getRemoteById from './get-by-id';
import updateRemote from './update';
import removeRemote from './remove';

export const remotesRouter = Router();

remotesRouter.get('/all', getRemotes);
remotesRouter.post('/add', addRemote);
remotesRouter.get('/:id', getRemoteById);
remotesRouter.post('/:id', updateRemote);
remotesRouter.delete('/:id', removeRemote);
