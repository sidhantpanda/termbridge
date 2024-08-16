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


export class TerminalSession {
  private conn: Client;
  private stream: any;

  constructor(conn: Client, onData: (data: string) => void) {
    this.conn = conn;
    conn.shell({ term: 'xterm-256color' }, (err, stream) => {
      if (err) throw err;
      stream.on('data', (data: { toString: () => any; }) => {
        onData(data.toString());
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
    this.stream.end();
    this.conn.end();
  }
}

export const startTerminalSession = async (options: ConnectConfig, onData: (data: string) => void) => {
  const conn = await connectToHost(options);
  return new TerminalSession(conn, onData);
}
