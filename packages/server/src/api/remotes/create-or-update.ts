import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import { CreateOrUpdateHostRequestBody } from '@termbridge/common';
import RemoteHosts from '../../couchdb/RemoteHosts';
import { isConnectionValid } from '../../lib/ssh';

const createOrUpdateSchema = Joi.object({
  remote: Joi.object({
    _id: Joi.string().optional(),
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().allow(''),
  })
});

const createOrUpdate: RequestHandler = async (req: Request<{}, {}, CreateOrUpdateHostRequestBody>, res) => {
  console.log('debug11', 1);
  const body = req.body;
  const result = createOrUpdateSchema.validate(body);

  if (result.error) {
    res.status(400).send({ error: result.error });
    return;
  }

  console.log('debug11', 2);
  const isDryRun = req.query.dryRun === 'true';
  const { _id, name, host, port, username, password } = body.remote;
  const existing = _id ? (await RemoteHosts.get(_id)) : undefined;
  if (_id && !existing) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }
  console.log('debug11', 3);
  const passwordToSave = password || existing?.password;



  try {
    await isConnectionValid({ host, port, username, password: passwordToSave });
    if (isDryRun) {
      res.send({ message: 'Connection successful' });
      return;
    }
    console.log('debug11', 4);
  } catch (err) {
    console.error('Connection error', err);
    res.status(400).send({ error: err });
    return;
  }

  console.log('Saving remote', { _id, name, host, port, username, password: passwordToSave });

  try {
    const saved = await RemoteHosts.insert({ ...(existing ?? {}), _id, name, host, port, username, password: passwordToSave });
    console.log(saved);

    res.send({
      message: 'saved',
      remote: {
        ...saved,
        password: undefined,
        privateKey: undefined,
      }
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export default createOrUpdate;
