import { Request, RequestHandler } from 'express';
import RemoteHosts from '../../couchdb/RemoteHosts';

const getRemoteById: RequestHandler = async (req: Request, res) => {
  const remote = await RemoteHosts.get(req.params.id);
  if (!remote) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }
  const toReturn = {
    _id: remote._id,
    name: remote.name,
    host: remote.host,
    port: remote.port,
    username: remote.username,
  }
  res.send({ remote: toReturn });
};

export default getRemoteById;
