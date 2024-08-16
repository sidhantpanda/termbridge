import { Request, RequestHandler } from 'express';
import { RemoteHost } from '@termbridge/common';
import RemoteHosts from '../../couchdb/RemoteHosts';

const getRemotes: RequestHandler = async (req: Request, res) => {
  const all = await RemoteHosts.list({ include_docs: true });

  const toReturn: RemoteHost[] = all.rows.map((row) => {
    return {
      ...row.doc!,
      password: undefined,
      privateKey: undefined,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  res.send({ hosts: toReturn });
};

export default getRemotes;
