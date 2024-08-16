import React from 'react';
import Terminal from '../components/TerminalContainer';
import { Box, Button, Card, Center, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useRemoteHosts from '../hooks/useRemoteHosts';

const Home = () => {
  const { hosts, isLoading, isFetching, isError, error } = useRemoteHosts();

  const hostTerminalLinks = hosts?.map((host) => (
    <Card key={host.name} p={2} m={2}>
      <Link to={`/terminal/${host.name}-${host._id}`}>
        {host.name}
      </Link>
    </Card>
  ));
  return (
    <>
      <Center>
        <Heading>Home Page</Heading>
      </Center>
      <Center>
        <Box w="500px">
          <Flex direction="row" >
            <Button colorScheme='pink' variant='solid'>
              Settings
            </Button>
            <Spacer />
            <div>ferf</div>
            <Spacer />
            <div>ferf</div>
          </Flex>
        </Box>
      </Center>

      <Center>
        <Flex direction="column" >
          <Box w="500px">
            {hostTerminalLinks}
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default Home;
