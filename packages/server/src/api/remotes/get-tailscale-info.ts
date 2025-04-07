import { Request, RequestHandler } from 'express';
import { getRedisClient } from '../../lib/redis';
import { getTailscaleInfo as getTSCommand } from '../../lib/tailscale';
import RemoteHosts from '../../couchdb/RemoteHosts';

const getTailscaleInfo: RequestHandler = async (req: Request, res) => {
  const _id = req.params.id;
  // const remote = await RemoteHosts.get(remoteId);

  const client = await getRedisClient();
  const existing = _id ? (await RemoteHosts.get(_id)) : undefined;
  if (_id && !existing) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }
  try {

    const ips = await getTSCommand(_id);

    if (client) {
      // console.log('Caching containers data for ', remoteId);
      // client.setEx(`${remoteId}:containers`, 30, JSON.stringify(containers));
    }
    // const saved = await RemoteHosts.insert({ ...existing, _id, tailscaleIps: ips });
    return res.send({ ips });
  } catch (error) {
    console.error('Error fetching containers:', error);
    return res.status(500).send({ error: 'Error fetching containers' });
  }
};

export default getTailscaleInfo;
