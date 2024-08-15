import { Server } from 'http';
import WebSocket from 'ws';
import { Client } from 'ssh2';
import RemoteHosts from './model/RemoteHosts';

// https://chatgpt.com/share/609b8f6b-8286-4536-83ba-6df7eff9adfa

export const startWsServer = (server: Server) => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', function connection(ws) {
    ws.on('message', async function incoming(message) {
      const data = JSON.parse(message as unknown as string);
      if (data.action === 'connect') {
        const conn = new Client();
        const hostConfig = await RemoteHosts.findOne({ name: data.hostName });
        if (!hostConfig) {
          ws.send(JSON.stringify({ error: 'remost host not found', status: 404 }));
        } else {
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

          }).connect({
            host: hostConfig.host,
            port: hostConfig.port,
            username: hostConfig.username,
            password: hostConfig.password,
          });
        }
      }
    });
  });
};
