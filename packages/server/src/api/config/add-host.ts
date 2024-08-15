import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import { AddRemoteHostRequest } from '@termbridge/common';
import RemoteHosts from '../../model/RemoteHosts';

const addHostSchema = Joi.object({
  name: Joi.string().required(),
  host: Joi.string().required(),
  port: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const addHost: RequestHandler = async (req: Request<{}, {}, AddRemoteHostRequest>, res) => {
  const body = req.body;
  const result = addHostSchema.validate(body);

  if (result.error) {
    res.status(400).send({ error: result.error });
    return;
  }

  const { name, host, port, username, password } = body;
  const remoteHost = new RemoteHosts({ name, host, port, username, password });
  const saved = await remoteHost.save();

  res.send({ success: true });
};

export default addHost;
