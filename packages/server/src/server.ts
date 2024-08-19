import express from 'express';
import http, { Server } from 'http';
import path from 'path';
import cors from 'cors';
import router from './routes';
import { ensureDBs } from './couchdb/init';
import { CLIENT_DIST, IS_DEV } from './config';

const port = IS_DEV ? 3001 : 3000;

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

app.use(express.static(CLIENT_DIST));
app.use('/api', router);
app.use('*', express.static(CLIENT_DIST));

export const startServer = async () => {
  return new Promise<Server>(async (resolve) => {
    await ensureDBs();
    server.listen(port, function () {
      console.log(`Server is listening on port ${port}`);
      resolve(server);
    });
  });
};
