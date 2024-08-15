import React from 'react';
import Terminal from '../components/TerminalContainer';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Flex direction="column">
      <Heading>Home Page</Heading>
      <Link to="/terminals">All Terminals</Link>
    </Flex>
  );
};

export default Home;
