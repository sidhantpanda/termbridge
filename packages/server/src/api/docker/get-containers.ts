import { Request, RequestHandler } from 'express';
import { getRedisClient } from '../../lib/redis';
import { getDockerContainers } from '../../lib/docker';

const getContainers: RequestHandler = async (req: Request, res) => {
  const remoteId = req.params.id;

  const client = await getRedisClient();

  if (client) {
    const dataInCache = await client.get(`${remoteId}:containers`);
    if (dataInCache) {
      console.log('Containers data found in cache for ', remoteId);
      return res.send({ containers: JSON.parse(dataInCache) });
    }
  }

  const containers = await getDockerContainers(remoteId);

  if (client) {
    console.log('Caching containers data for ', remoteId);
    client.setEx(`${remoteId}:containers`, 30, JSON.stringify(containers));
  }
  return res.send({ containers });
};

export default getContainers;
