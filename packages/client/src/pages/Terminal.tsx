import React from 'react';
import TerminalContainer from '../components/TerminalContainer';
import { useParams } from 'react-router-dom';

const Terminal = () => {
  const { id_host } = useParams();
  const [name, id] = id_host.split('-');
  return (
    <TerminalContainer id={id} name={name} h="100vh" w="100vw" />
  );
};

export default Terminal;
