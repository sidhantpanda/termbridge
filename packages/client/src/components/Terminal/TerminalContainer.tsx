// https://codesandbox.io/p/sandbox/react-xtermjs-dynamic-height-mvs714

import React, { useEffect, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { v4 } from 'uuid';
import { FitAddon } from '@xterm/addon-fit';
import { Flex, FlexProps } from '@chakra-ui/react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getTerminalGridUnits } from './terminal-utils';

interface TerminalContainerProps extends FlexProps {
  id: string;
  name: string;
}

const TerminalContainer = ({ id, name, ...rest }: TerminalContainerProps) => {
  const [terminalId] = useState(v4());
  const { width, height } = useWindowSize();
  const [terminal, setTerminal] = useState<Terminal | null>();
  const [fitAddon] = useState(new FitAddon());

  const getContainer = () => document.getElementById(terminalId);

  const wsHost = __WS_HOST__;
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsHost);

  const handleResize = () => {
    const container = getContainer();
    if (container && terminal) {
      const { rows, cols } = getTerminalGridUnits(container);
      terminal.resize(cols, rows);
      fitAddon.fit();

      sendMessage(JSON.stringify({
        action: 'resize',
        cols,
        rows,
        width: container.clientWidth,
        height: container.clientHeight
      }));
    }
  };

  const initTerm = () => {
    const container = getContainer();
    const { rows, cols } = getTerminalGridUnits(container);
    const terminal = new Terminal({
      cols: cols,
      rows: rows,
      convertEol: true,
      cursorBlink: true,
      theme: {
        foreground: '#ffffff',
        background: '#000000'
      }
    });
    terminal.open(container);
    terminal.loadAddon(fitAddon);
    terminal.onData((data) => {
      sendMessage(JSON.stringify({ action: 'input', data }));
    });
    setTerminal(terminal);
    fitAddon.fit();
    sendMessage(JSON.stringify({
      action: 'connect',
      id
    }));
    return terminal;
  };


  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.action === 'data') {
        terminal.write(data.data);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      const terminal = initTerm();
      terminal.write('Connecting to ' + name + ' (' + id + ')...\r\n');

      handleResize();
    }
  }, [readyState]);

  useEffect(() => {
    fitAddon.fit();
    handleResize();
  }, [height, width]);

  return (
    <Flex className="termterm" id={terminalId} w="100%" h="100%" {...rest} />
  );
};

export default TerminalContainer;
