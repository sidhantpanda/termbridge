import { Request, RequestHandler } from 'express';
import { getRemoteHosts } from '../../lib/remote-hosts';

const getHosts: RequestHandler = async (req: Request, res) => {
  const hosts = await getRemoteHosts();

  res.send({ hosts });
};

export default getHosts;
