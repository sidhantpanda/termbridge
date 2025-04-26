import express from 'express';
import http, { Server } from 'http';
import path from 'path';
import morgan from 'morgan';
import promMid from 'express-prometheus-middleware';
import cors from 'cors';
import router from './routes';
import { CLIENT_DIST, IS_DEV } from './config';
import { getRedisClient } from './lib/redis';
import { startDb } from './postgres';

const port = IS_DEV ? 3001 : 3000;

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(promMid({
  metricsPath: '/metrics',
  customLabels: [IS_DEV ? 'dev' : 'prod'],
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
}));

const server = http.createServer(app);

console.log({ CLIENT_DIST })

app.use(express.static(CLIENT_DIST));
app.use('/api', router);
app.get('/*', (req, res) => {
  res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});

export const startServer = async () => {
  return new Promise<Server>(async (resolve) => {
    await getRedisClient();
    server.listen(port, function () {
      console.log(`Server is listening on port ${port}`);
      resolve(server);
    });
  });
};
