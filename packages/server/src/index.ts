import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { Client } from 'ssh2';
import path from 'path';
import { hostsConfig } from './secret';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const currentDir = __dirname;
console.log({ currentDir });
const publicDir = path.join(currentDir, 'public');

app.use(express.static(publicDir));

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message as unknown as string);
    if (data.action === 'connect') {
      const conn = new Client();
      conn.on('ready', () => {
        ws.send(JSON.stringify({ action: 'status', message: 'Connected' }));
        conn.shell((err, stream) => {
          if (err) throw err;
          stream.on('data', (data: { toString: () => any; }) => {
            ws.send(JSON.stringify({ action: 'data', data: data.toString() }));
          });
          ws.on('message', (message) => {
            const msg = JSON.parse(message as unknown as string);
            if (msg.action === 'input') {
              stream.write(msg.data);
            }
          });
        });

      }).connect(hostsConfig[data.host]);
    }
  });
});

server.listen(3001, function () {
  console.log('Server is listening on port 3001');
});
