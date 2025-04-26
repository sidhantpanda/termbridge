import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import { CreateOrUpdateHostRequestBody } from '@termbridge/common';
import { isConnectionValid } from '../../lib/ssh/connection';
import { getConnection } from 'typeorm'
import { AppDataSource } from '../../postgres/data-source';
import { ConnectConfigEntity } from '../../postgres/models/RemoteHost';

const createOrUpdateSchema = Joi.object({
  remote: Joi.object({
    id: Joi.string().optional(),
    // _id: Joi.string().optional(),
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().allow(''),
  })
});

const createOrUpdate: RequestHandler = async (req: Request<{}, {}, CreateOrUpdateHostRequestBody>, res) => {
  const body = req.body;
  const result = createOrUpdateSchema.validate(body);

  if (result.error) {
    res.status(400).send({ error: result.error });
    return;
  }

  const isDryRun = req.query.dryRun === 'true';
  const { id, name, host, port, username, password } = body.remote;
  // const existing = _id ? (await RemoteHosts.get(_id)) : undefined;
  // const existingPg = cpmst
  const connectConfigsRepo = AppDataSource.getRepository(ConnectConfigEntity);
  const existingPg = await connectConfigsRepo.findOneBy({ id: id });
  // connectConfigsRepo.getId(_id);
  if (id && !existingPg) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }
  const passwordToSave = password || existingPg?.password;

  try {
    await isConnectionValid({ host, port, username, password: passwordToSave });
    if (isDryRun) {
      res.send({ message: 'Connection successful' });
      return;
    }
  } catch (err) {
    console.error('Connection error', err);
    res.status(400).send({ error: err });
    return;
  }

  try {
    // const saved = await RemoteHosts.insert({ ...(existing ?? {}), _id, name, host, port, username, password: passwordToSave });
    // const saved
    if (id && existingPg) {
      const updated = await connectConfigsRepo.update(id, {
        name,
        host,
        port,
        username,
        password: passwordToSave,
      });

      const result = updated;
      // result.
      console.log('updated', result);
      res.send({
        message: 'updated',
        remote: {
          // ...updated,
          password: undefined,
          privateKey: undefined,
        }
      });
    } else {
      const newConfig = connectConfigsRepo.create({
        // id,
        name,
        host,
        port,
        username,
        password: passwordToSave,
      });
      const saved = await connectConfigsRepo.save(newConfig);
      console.log('saved', saved);
      res.send({
        message: 'saved',
        remote: {
          ...saved,
          password: undefined,
          privateKey: undefined,
        }
      });
    }
    // console.log(saved);


  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export default createOrUpdate;
