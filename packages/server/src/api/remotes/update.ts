import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import { AddRemoteHostRequest } from '@termbridge/common';
import RemoteHosts from '../../couchdb/RemoteHosts';
import { isConnectionValid } from '../../lib/ssh';

const updateRemoteSchema = Joi.object({
  isDryRun: Joi.boolean(),
  remote: Joi.object({
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().allow(''),
  })
});

const updateRemote: RequestHandler = async (req: Request<{ id?: string }, {}, AddRemoteHostRequest>, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ error: 'id is required' });
    return;
  }

  const remote = await RemoteHosts.get(id);
  if (!remote) {
    res.status(404).send({ message: 'Remote not found' });
  }


  const body = req.body;
  const result = updateRemoteSchema.validate(body);

  if (result.error) {
    res.status(400).send({ error: result.error });
    return;
  }

  const isDryRun = body.isDryRun ?? false;
  const { name, host, port, username } = body.remote;

  let password = body.remote.password || remote.password;

  try {
    await isConnectionValid({ host, port, username, password });
    if (isDryRun) {
      res.send({ message: 'Connection successful' });
      return;
    }
    const saved = await RemoteHosts.insert({ ...remote, _id: id, name, host, port, username, password });
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

export default updateRemote;
