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
    this.stream.write(data);
  }

  resize(cols: number, rows: number, width: number, height: number) {
    this.stream.setWindow(rows, cols, height, width);
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
