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

interface TerminalSessionOptions {
  client: Client;
  onData: (data: string) => void;
  onLogout: () => void;
}

export class TerminalSession {
  private client: Client;
  private stream: any;

  constructor(options: TerminalSessionOptions) {
    const { client, onData, onLogout } = options;
    this.client = client;
    client.shell({ term: 'xterm-256color' }, (err, stream) => {
      if (err) throw err;
      stream.on('data', (data: { toString: () => any; }) => {
        onData(data.toString());
      });
      stream.on('close', () => {
        onLogout();
        client.end(); // Ensure connection and stream are closed properly
      });
      this.stream = stream;
    });
  }

  write(data: string) {
    if (this.stream) {
      this.stream.write(data);
    }
  }

  resize(cols: number, rows: number, width: number, height: number) {
    if (this.stream) {
      this.stream.setWindow(rows, cols, height, width);
    }
  }

  end() {
    if (this.stream) {
      this.stream.end();
    }
    if (this.client) {
      this.client.end();
    }
  }
}

interface StarTerminalSessionOptions {
  config: ConnectConfig;
  onData: (data: string) => void;
  onLogout: () => void;
}

export const startTerminalSession = async (options: StarTerminalSessionOptions) => {
  const { config, onData, onLogout } = options;
  const client = await connectToHost(config);
  return new TerminalSession({ client, onData, onLogout });
}
