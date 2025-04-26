import { Client } from 'ssh2';
import { AppDataSource } from '../postgres/data-source';
import { ConnectConfigEntity } from '../postgres/models/RemoteHost';

const command = "tailscale ip";

export const getTailscaleInfo = (id: string): Promise<string[]> => {
  return new Promise<string[]>(async (resolve, reject) => {
    const connectConfigsRepo = AppDataSource.getRepository(ConnectConfigEntity);
    const remote = await connectConfigsRepo.findOneBy({ id });
    // const remote = await RemoteHosts.get(id);
    const conn = new Client();
    if (!remote) {
      reject(new Error('Remote not found'));
      return;
    }
    const sshConfig = remote;

    conn.on('ready', () => {
      // Execute the docker ps command with JSON formatting.
      // The --format '{{json .}}' flag outputs each container as a JSON object on its own line.
      conn.exec(command, { pty: true }, (err, stream) => {
        if (err) {
          console.error('Error executing command:', err);
          return conn.end();
        }

        let output = '';

        stream.on('data', (data: Buffer) => {
          const text = data.toString();
          output += text;
        });

        stream.stderr.on('data', (data) => {
          console.error('STDERR:', data.toString());
        });

        stream.on('close', (code: string, signal: string) => {
          console.log(`***************\nCommand:\t\t${command}\nCode:\t\t${code}\nSignal:\t\t${signal}\n***************`);
          // console.log(`Command finished with code ${code} and signal ${signal}`);
          // console.log(`Command finished with code ${code} and signal ${signal}`);
          // Process the output: each non-empty line should be a JSON string
          try {
            const ips = output.split('\n').filter(line => line.trim() !== '').map(line => line.trim());
            resolve(ips);
            // const jsonArray = lines.map(line => JSON.parse(line));
            // Cache the data for 30 seconds
            // resolve(jsonArray);
          } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            console.log('Raw Output:', output);
            reject(parseErr);
          }
          conn.end();
        });
      });
    }).on('error', (err) => {
      console.error('Connection Error:', err);
      reject(err);
    }).connect(sshConfig);
  });
}