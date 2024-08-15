import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { Client } from 'ssh2';
import path from 'path';
import { hostsConfig } from './secret';
import router from './routes';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const currentDir = __dirname;
console.log({ currentDir });
const publicDir = path.join(currentDir, 'public');

app.use(express.static(publicDir));
app.use('/api', router);

// Disable CORS


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message as unknown as string);
    if (data.action === 'connect') {
      const conn = new Client();
      conn.on('ready', () => {
        ws.send(JSON.stringify({ action: 'status', message: 'Connected' }));
        conn.shell({ term: 'xterm-256color' }, (err, stream) => {
          if (err) throw err;
          stream.on('data', (data: { toString: () => any; }) => {
            ws.send(JSON.stringify({ action: 'data', data: data.toString() }));
          });
          ws.on('message', (message) => {
            const msg = JSON.parse(message as unknown as string);
            if (msg.action === 'input') {
              stream.write(msg.data);
            }
            if (msg.action === 'resize') {
              stream.setWindow(data.rows, data.cols, data.height, data.width);
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
