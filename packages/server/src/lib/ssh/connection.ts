import { Client, ConnectConfig } from 'ssh2';

export const isPasswordRequired = async (options: ConnectConfig) => {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn.on('ready', () => {
      // If connection is successful, it means no password was required
      resolve(false);
      conn.end();
    }).on('keyboard-interactive', () => {
      // If the server requests keyboard-interactive authentication, password is required
      resolve(true);
      conn.end();
    }).on('error', (err) => {
      // Handle connection errors
      if (err.message.includes('All configured authentication methods failed')) {
        resolve(true);
      } else {
        reject(`SSH connection error: ${err.message}`);
      }
      conn.end();
    }).connect({
      ...options,
      tryKeyboard: true,
      readyTimeout: 5000, // Timeout after 5 seconds
      authHandler: (methods) => {
        if (methods.includes('password')) {
          // Password is required if this method is presented
          return { method: 'password' };
        }
        return { method: null };
      },
    });
  });
};

export const isConnectionValid = async (options: ConnectConfig) => {
  return new Promise((resolve, reject) => {
    const conn = new Client();
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

export const connectToHost = async (options: ConnectConfig): Promise<Client> => {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      resolve(conn);
    });
    conn.on('error', (err) => {
      console.error('Error connecting', err);
      reject(err.message);
    });
    conn.connect(options);
  });
};
