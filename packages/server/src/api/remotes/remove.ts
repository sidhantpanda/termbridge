import { Request, RequestHandler } from 'express';
import { AppDataSource } from '../../postgres/data-source';
import { ConnectConfigEntity } from '../../postgres/models/RemoteHost';

const removeRemote: RequestHandler = async (req: Request, res) => {
   const connectConfigsRepo = AppDataSource.getRepository(ConnectConfigEntity);
    const existingPg = await connectConfigsRepo.findOneBy({ id: req.params.id });

  if (!existingPg) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }
  const removed = await connectConfigsRepo.remove(existingPg);
  
    
  // const remote = await RemoteHosts.get(req.params.id);
  // if (!remote) {
  //   res.status(404).send({ message: 'Remote not found' });
  //   return;
  // }
  // const removed = await RemoteHosts.destroy(remote._id, remote._rev);
  res.send({ remote: removed });
};

export default removeRemote;
