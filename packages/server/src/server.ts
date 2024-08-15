import express from 'express';
import http, { Server } from 'http';
import path from 'path';
import router from './routes';

const app = express();

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const server = http.createServer(app);

const currentDir = __dirname;
console.log({ currentDir });
const publicDir = path.join(currentDir, 'public');

app.use(express.static(publicDir));
app.use('/api', router);

export const startServer = async () => {
  return new Promise<Server>((resolve) => {
    server.listen(3001, function () {
      console.log('Server is listening on port 3001');
      resolve(server);
    });
  });
};
