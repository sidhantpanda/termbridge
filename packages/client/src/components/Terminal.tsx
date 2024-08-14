import React, { useEffect, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { v4 } from 'uuid';
import { FitAddon } from '@xterm/addon-fit';


interface TerminalContainerProps {
  host: string;
}

const TerminalContainer = ({ host }: TerminalContainerProps) => {
  const [terminalId] = useState(v4());
  const [terminal] = useState(new Terminal());
  const [fitAddon] = useState(new FitAddon());

  // const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const wsHost = window.location.host === 'localhost:3000' ? 'localhost:3001' : window.location.host;
  const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${wsHost}`);

  useEffect(() => {
    if (lastMessage !== null) {
      // setMessageHistory((prev) => prev.concat(lastMessage));
      const data = JSON.parse(lastMessage.data);
      if (data.action === 'data') {
        terminal.write(data.data);
        fitAddon.fit();
        // terminal.clear();
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      terminal.loadAddon(fitAddon);
      fitAddon.fit();
      terminal.open(document.getElementById(terminalId));
      terminal.onData((data) => {
        sendMessage(JSON.stringify({ action: 'input', data }));
      });
      // terminal.writeln('clear');;

      sendMessage(JSON.stringify({
        action: 'connect',
        host
      }));
    }
  }, [readyState]);

  useEffect(() => {

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id={terminalId}></div>
  );
};

export default TerminalContainer;
