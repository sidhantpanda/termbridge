import { Client, ConnectConfig } from 'ssh2';
import { connectToHost } from './connection';

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
