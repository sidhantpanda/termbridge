import { Client, ConnectConfig } from 'ssh2';

export const isConnectionValid = async (options: ConnectConfig) => {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      console.log({ conn })
      conn.destroy();
      conn.end();
      reject('Connection timed out');
    }, 5000);

    conn.on('ready', () => {
      conn.destroy();
      conn.end();
      clearTimeout(timeout);
      resolve(true);
    });
    conn.on('error', (err) => {
      console.error('Error connecting', err);
      conn.destroy();
      conn.end();
      clearTimeout(timeout);
      reject(err.message);
    });
    conn.connect(options);
  });
};
