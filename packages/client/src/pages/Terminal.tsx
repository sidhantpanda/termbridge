import React from 'react';
import TerminalContainer from '../components/TerminalContainer';
import { useParams } from 'react-router-dom';

const Terminal = () => {
  const { host } = useParams();
  return (
    <TerminalContainer hostName={host} h="500px" />
  );
};

export default Terminal;
