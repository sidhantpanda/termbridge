import React from 'react';
import Terminal from '../components/TerminalContainer';
import { Box, Button, Card, Center, Flex, Heading, Icon, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaServer } from "react-icons/fa6";
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
