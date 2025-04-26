import { Request, RequestHandler } from 'express';
import { RemoteHost } from '@termbridge/common';
import { AppDataSource } from '../../postgres/data-source';
import { ConnectConfigEntity } from '../../postgres/models/RemoteHost';

const getRemotes: RequestHandler = async (req: Request, res) => {
  // const all = await RemoteHosts.list({ include_docs: true });

  // const toReturn: RemoteHost[] = all.rows.map((row) => {
  //   return {
  //     ...row.doc!,
  //     password: undefined,
  //     privateKey: undefined,
  //   };
  // }).sort((a, b) => a.name.localeCompare(b.name));

  const connectConfigsRepo = AppDataSource.getRepository(ConnectConfigEntity);
  const allPg = await connectConfigsRepo.find();
  const toReturn: Partial<ConnectConfigEntity>[] = allPg.map((row) => {
    return {
      ...row,
      password: undefined,
      privateKey: undefined,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
  // const toReturn: RemoteHost[] = allPg.map((row) => {
  //   return {
  //     ...row,
  //     password: undefined,
  //     privateKey: undefined,
  //   };

  // }).sort((a, b) => a.name.localeCompare(b.name));
  res.send({ hosts: toReturn });
};

export default getRemotes;
