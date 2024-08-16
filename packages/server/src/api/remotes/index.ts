import { Router } from 'express';
import getRemotes from './get-all';
import addRemote from './add';
import addRemoteTest from './add-test';

export const remotesRouter = Router();

// configRouter.get('/hosts', getHosts);

remotesRouter.get('/all', getRemotes);
remotesRouter.post('/add', addRemote);
remotesRouter.post('/add-test', addRemoteTest);
