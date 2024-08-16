import express from 'express';
import http, { Server } from 'http';
import path from 'path';
import cors from 'cors';
import router from './routes';
import { ensureDBs } from './couchdb/init';

const app = express();

app.use(express.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
}));

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const server = http.createServer(app);

const currentDir = __dirname;
const publicDir = path.join(currentDir, 'public');

app.use(express.static(publicDir));
app.use('/api', router);

export const startServer = async () => {
  return new Promise<Server>(async (resolve) => {
    await ensureDBs();
    server.listen(3001, function () {
      console.log('Server is listening on port 3001');
      resolve(server);
    });
  });
};
