import { Request, RequestHandler } from 'express';
import { getRedisClient } from '../../lib/redis';
import { getTailscaleInfo as getTSCommand } from '../../lib/tailscale';
import { AppDataSource } from '../../postgres/data-source';
import { ConnectConfigEntity } from '../../postgres/models/RemoteHost';

const CACHE_TTL = 5 * 60; // 5 minutes

const getTailscaleInfo: RequestHandler = async (req: Request, res) => {
  const id = req.params.id;
  const client = await getRedisClient();

  if (client) {
    const cached = await client.get(`${id}:tailscale-info`);
    if (cached) {
      // console.log('Using cached tailscale data for ', _id);
      return res.send({ ips: JSON.parse(cached) });
    }
  }

  // const existing = id ? (await RemoteHosts.get(id)) : undefined;
  const connectConfigsRepo = AppDataSource.getRepository(ConnectConfigEntity);
  const existing = await connectConfigsRepo.findOneBy({ id: req.params.id });
  if (id && !existing) {
    res.status(404).send({ message: 'Remote not found' });
    return;
  }

  try {
    const ips = await getTSCommand(id);
    if (client) {
      console.log('Caching tailscale info for ', id);
      client.setEx(`${id}:tailscale-info`, CACHE_TTL, JSON.stringify(ips));
    }
    return res.send({ ips });
  } catch (error) {
    console.error('Error fetching tailscale info:', error);
    return res.status(500).send({ error: 'Error fetching tailscale info' });
  }
};

export default getTailscaleInfo;
