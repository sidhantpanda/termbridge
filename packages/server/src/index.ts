import { startServer } from './server';
import { startWsServer } from './server-ws';

const main = async () => {
  const server = await startServer();
  startWsServer(server);
};

main();
