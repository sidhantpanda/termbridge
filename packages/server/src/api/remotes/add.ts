import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import { AddRemoteHostRequest } from '@termbridge/common';
import RemoteHosts from '../../couchdb/RemoteHosts';
import { isConnectionValid } from '../../lib/ssh';

const addHostSchema = Joi.object({
  isDryRun: Joi.boolean(),
  remote: Joi.object({
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
});

const addRemote: RequestHandler = async (req: Request<{}, {}, AddRemoteHostRequest>, res) => {
  const body = req.body;
  const result = addHostSchema.validate(body);

  if (result.error) {
    res.status(400).send({ error: result.error });
    return;
  }

  const isDryRun = body.isDryRun ?? false;
  const { name, host, port, username, password } = body.remote;

  try {
    await isConnectionValid({ host, port, username, password });
    if (isDryRun) {
      res.send({ message: 'Connection successful' });
      return;
    }
    const saved = await RemoteHosts.insert({ name, host, port, username, password });
    console.log(saved);

    res.send({
      message: 'saved', remote: {
        ...saved,
        password: undefined,
        privateKey: undefined,
      }
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export default addRemote;
