import { Request, RequestHandler } from 'express';
import RemoteHosts from '../../model/RemoteHosts';
import { RemoteHost } from '@termbridge/common';

const getHosts: RequestHandler = async (req: Request, res) => {
  // const hosts = await getRemoteHosts();

  const hosts = await RemoteHosts.find();

  const toReturn: RemoteHost[] = hosts.map((host) => {
    return {
      _id: host._id.toString(),
      name: host.name!,
      host: host.host!,
    };
  });

  res.send({ hosts: toReturn });
};

export default getHosts;
