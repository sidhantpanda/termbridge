// https://codesandbox.io/p/sandbox/react-xtermjs-dynamic-height-mvs714

import React, { useEffect, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { v4 } from 'uuid';
import { FitAddon } from '@xterm/addon-fit';
import { Flex, FlexProps } from '@chakra-ui/react';

interface TerminalContainerProps extends FlexProps {
  id: string;
  name: string;
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{ width?: number; height?: number }>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}


const TerminalContainer = ({ id, name, ...rest }: TerminalContainerProps) => {
  const { width, height } = useWindowSize();
  const [terminalId] = useState(v4());
  const [terminal, setTerminal] = useState<Terminal | null>();
  const [fitAddon] = useState(new FitAddon());

  // const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const wsHost = window.location.host === 'localhost:3000' ? 'localhost:3001' : window.location.host;
  const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${wsHost}`);

  const getTerminalCols = (container: HTMLElement) => {
    const width = container.clientWidth;
    const characterWidth = 9;  // This is a rough estimation; you might need to adjust this based on the terminal's font size.
    return Math.floor(width / characterWidth);
  }

  const getTerminalRows = (container: HTMLElement) => {
    const width = container.clientHeight;
    const characterHeight = 18;  // This is a rough estimation; you might need to adjust this based on the terminal's font size.
    return Math.floor(width / characterHeight);
  }

  const initTerm = (container: HTMLElement) => {
    const cols = getTerminalCols(container);
    const rows = getTerminalRows(container);
    return new Terminal({
      cols: cols,
      rows: rows,
      convertEol: true,
      cursorBlink: true,
      theme: {
        foreground: '#ffffff',
        background: '#000000'
      }
    });
  }

  useEffect(() => {
    if (lastMessage !== null) {
      // setMessageHistory((prev) => prev.concat(lastMessage));
      const data = JSON.parse(lastMessage.data);
      if (data.action === 'data') {
        terminal.write(data.data);
        // fitAddon.fit();
        // terminal.clear();
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      const container = document.getElementById(terminalId);
      sendMessage(JSON.stringify({
        action: 'resize',
        cols: getTerminalCols(container),
        rows: getTerminalRows(container),
        width: container.clientWidth,
        height: container.clientHeight
      }));

      const terminal = initTerm(container);

      terminal.open(document.getElementById(terminalId));
      setTerminal(terminal);

      terminal.loadAddon(fitAddon);
      fitAddon.fit();

      terminal.onData((data) => {
        sendMessage(JSON.stringify({ action: 'input', data }));
      });
      // terminal.writeln('clear');;

      sendMessage(JSON.stringify({
        action: 'connect',
        id
      }));
      // terminal.input('clear\n');
      terminal.write('Connecting to ' + name + ' (' + id + ')...\r\n');
    }
  }, [readyState]);

  useEffect(() => {
    fitAddon.fit();
    // term.resize(cols, rows);
    const container = document.getElementById(terminalId);


    sendMessage(JSON.stringify({
      action: 'resize',
      cols: getTerminalCols(container),
      rows: getTerminalRows(container),
      width: container.clientWidth,
      height: container.clientHeight
    }));
  }, [height, width]);



  return (
    <Flex className="termterm" id={terminalId} w="100%" h="100%" {...rest}>
    </Flex>
  );
};

export default TerminalContainer;
