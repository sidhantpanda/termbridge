import React from 'react';
import { Box, Button, Center, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useRemoteHosts from '../hooks/useRemoteHosts';
import HostCard from '../components/HostCard';

const Home = () => {
  const { hosts, isLoading, isFetching, isError, error } = useRemoteHosts();

  const hostTerminalLinks = hosts?.map((host) => (
    <HostCard key={host._id} hostConfig={host} />
  ));

  return (
    <>
      <Center>
        <Heading>Home Page</Heading>
      </Center>
      <Flex direction="row" >
        <Link to='/remotes/add'>
          <Button colorScheme='pink' variant='solid'>
            Add Remote
          </Button>
        </Link>
        <Spacer />
      </Flex>

      <Flex direction="column" mt="8px" gap="6px">
        {hostTerminalLinks}
      </Flex>
    </>
  );
};

export default Home;
