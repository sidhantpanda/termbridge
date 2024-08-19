import { Server } from 'http';
import WebSocket from 'ws';
import { Client } from 'ssh2';
import RemoteHosts from './couchdb/RemoteHosts';
import { startTerminalSession } from './lib/ssh';

// https://chatgpt.com/share/609b8f6b-8286-4536-83ba-6df7eff9adfa

export const startWsServer = (server: Server) => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', function connection(ws) {
    ws.on('message', async function incoming(message) {
      const data = JSON.parse(message as unknown as string);
      if (data.action === 'connect') {
        const hostConfig = await RemoteHosts.get(data.id);
        if (!hostConfig) {
          ws.send(JSON.stringify({
            action: 'data',
            data: JSON.stringify({
              status: 404,
              error: 'remost host not found',
              detail: `Remote host with id ${data.id} not found`
            }, null, 2)
          }));
        } else {
          const terminalSession = await startTerminalSession({
            config: hostConfig,
            onData: (data: string) => {
              ws.send(JSON.stringify({
                action: 'data',
                data
              }));
            },
            onLogout: () => {
              ws.send(JSON.stringify({
                action: 'logout'
              }));
            }
          });
          ws.on('message', (message) => {
            const msg = JSON.parse(message as unknown as string);
            if (msg.action === 'input') {
              terminalSession.write(msg.data);
            }
            if (msg.action === 'resize') {
              terminalSession.resize(msg.cols, msg.rows, msg.width, msg.height);
            }
          });
        }
      }
    });
  });
};
