import React from 'react';
import Terminal from '../components/TerminalContainer';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useRemoteHosts from '../hooks/useRemoteHosts';

const Home = () => {
  const { hosts, isLoading, isFetching, isError, error } = useRemoteHosts();

  const hostTerminalLinks = hosts?.map((host) => (
    <Link key={host.name} to={`/terminal/${host.name}`}>
      {host.name}
    </Link>
  ));
  return (
    <Flex direction="column">
      <Heading>Home Page</Heading>
      {hostTerminalLinks}
    </Flex>
  );
};

export default Home;
