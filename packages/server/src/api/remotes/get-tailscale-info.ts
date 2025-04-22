import { Request, RequestHandler } from 'express';
import { getRedisClient } from '../../lib/redis';
import { getTailscaleInfo as getTSCommand } from '../../lib/tailscale';
import RemoteHosts from '../../couchdb/RemoteHosts';

const CACHE_TTL = 5 * 60; // 5 minutes

const getTailscaleInfo: RequestHandler = async (req: Request, res) => {
  const _id = req.params.id;
  const client = await getRedisClient();

  if (client) {
    const cached = await client.get(`${_id}:tailscale-info`);
    if (cached) {
      // console.log('Using cached tailscale data for ', _id);
      return res.send({ ips: JSON.parse(cached) });
    }
  }

  const existing = _id ? (await RemoteHosts.get(_id)) : undefined;
  if (_id && !existing) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }

  try {
    const ips = await getTSCommand(_id);
    if (client) {
      console.log('Caching tailscale info for ', _id);
      client.setEx(`${_id}:tailscale-info`, CACHE_TTL, JSON.stringify(ips));
    }
    return res.send({ ips });
  } catch (error) {
    console.error('Error fetching tailscale info:', error);
    return res.status(500).send({ error: 'Error fetching tailscale info' });
  }
};

export default getTailscaleInfo;
