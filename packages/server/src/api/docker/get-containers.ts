import { Request, RequestHandler } from 'express';
import { RemoteHost } from '@termbridge/common';
import RemoteHosts from '../../couchdb/RemoteHosts';
import { Client } from 'ssh2';

const getContainers: RequestHandler = async (req: Request, res) => {
  const remote = await RemoteHosts.get(req.params.id);
  // const hosts = await RemoteHosts.list({ include_docs: true });
  const conn = new Client();
  const sshConfig = remote as RemoteHost;
  const sudoPassword = remote.password;

  conn.on('ready', () => {
    console.log('SSH Connection Ready');

    // Execute the docker ps command with JSON formatting.
    // The --format '{{json .}}' flag outputs each container as a JSON object on its own line.
    conn.exec("sudo docker ps --format '{{json .}}'", { pty: true }, (err, stream) => {
      if (err) {
        console.error('Error executing command:', err);
        return conn.end();
      }

      let output = '';
      let sudoPasswordSent = false;

      stream.on('data', (data: Buffer) => {
        const text = data.toString();
        // Detect sudo prompt and send the password if not already done
        if (text.includes('[sudo] password for') && !sudoPasswordSent) {
          console.log('Sudo password prompt detected. Sending password...');
          stream.write(`${sudoPassword}\n`);
          sudoPasswordSent = true;
        } else {
          output += text;
        }
      });

      stream.stderr.on('data', (data) => {
        console.error('STDERR:', data.toString());
      });

      stream.on('close', (code: string, signal: string) => {
        // console.log(`Command finished with code ${code} and signal ${signal}`);
        // Process the output: each non-empty line should be a JSON string
        try {
          const lines = output.split('\n').filter(line => line.trim() !== '');
          const jsonArray = lines.map(line => JSON.parse(line));
          res.send({ containers: jsonArray });
        } catch (parseErr) {
          console.error('Error parsing JSON:', parseErr);
          console.log('Raw Output:', output);
        }
        conn.end();
      });
    });
  }).on('error', (err) => {
    console.error('Connection Error:', err);
  }).connect(sshConfig);

};

export default getContainers;
