import { Request, RequestHandler } from 'express';
import { AppDataSource } from '../../postgres/data-source';
import { ConnectConfigEntity } from '../../postgres/models/RemoteHost';

const getRemoteById: RequestHandler = async (req: Request, res) => {
  // const remote = await RemoteHosts.get(req.params.id);
  const connectConfigsRepo = AppDataSource.getRepository(ConnectConfigEntity);
  const existingPg = await connectConfigsRepo.findOneBy({ id: req.params.id });
  if (!existingPg) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }
  const toReturn = {
    id: existingPg.id,
    name: existingPg.name,
    host: existingPg.host,
    port: existingPg.port,
    username: existingPg.username,
  }
  res.send({ remote: toReturn });
};

export default getRemoteById;
