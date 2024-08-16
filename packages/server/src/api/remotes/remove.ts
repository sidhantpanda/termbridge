import { Request, RequestHandler } from 'express';
import RemoteHosts from '../../couchdb/RemoteHosts';

const removeRemote: RequestHandler = async (req: Request, res) => {
  const remote = await RemoteHosts.get(req.params.id);
  if (!remote) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }
  const removed = await RemoteHosts.destroy(remote._id, remote._rev);
  res.send({ remote: removed });
};

export default removeRemote;
