import express from 'express';
import http, { Server } from 'http';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';
import {
  MONGO_DBNAME,
  MONGO_HOST,
  MONGO_PASS,
  MONGO_PORT,
  MONGO_USER
} from './config';

const app = express();

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
    const mongoConnectionString = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

    console.log(`Connecting to ${mongoConnectionString}`);

    await mongoose.connect(`${mongoConnectionString}`, {
      user: MONGO_USER,
      pass: MONGO_PASS,
      dbName: MONGO_DBNAME,
      autoCreate: true,
    });

    server.listen(3001, function () {
      console.log('Server is listening on port 3001');
      resolve(server);
    });
  });
};
