import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import { AddRemoteHostRequest } from '@termbridge/common';
import { Client } from 'ssh2';
import { isConnectionValid } from '../../lib/ssh';

const addHostSchema = Joi.object({
  name: Joi.string().required(),
  host: Joi.string().required(),
  port: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const addRemoteTest: RequestHandler = async (req: Request<{}, {}, AddRemoteHostRequest>, res) => {
  const body = req.body;
  const result = addHostSchema.validate(body);

  if (result.error) {
    res.status(400).send({ error: result.error });
    return;
  }

  const { name, host, port, username, password } = body;
  // const saved = await RemoteHosts.insert({ name, host, port, username, password });
  // console.log(saved);

  try {
    await isConnectionValid({ host, port, username, password });
    res.status(200).send({ message: 'Connection successful' });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export default addRemoteTest;
