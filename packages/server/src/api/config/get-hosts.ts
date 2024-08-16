import { Request, RequestHandler } from 'express';
import { RemoteHost } from '@termbridge/common';
import RemoteHosts from '../../couchdb/RemoteHosts';
// import { getAllRemoteHosts } from '../../couchdb/RemoteHosts';

const getHosts: RequestHandler = async (req: Request, res) => {
  const all = await RemoteHosts.list({ include_docs: true });
  // const hosts = await getAllRemoteHosts();
  const toReturn: RemoteHost[] = all.rows.map((row) => {
    return {
      _id: row.doc!._id,
      name: row.doc!.name,
      host: row.doc!.host,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  res.send({ hosts: toReturn });
};

export default getHosts;
