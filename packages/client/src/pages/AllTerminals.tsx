import React from 'react';
import Terminal from '../components/TerminalContainer';
import { Box, Flex, Spacer } from '@chakra-ui/react';

const AllTerminals = () => {
  return (
    <Flex direction="column" w="full" h="full">

      <Flex w="full" h="500px" >
        <Terminal hostName="rpi3a" />
        <Terminal hostName="rpi3b" />
        <Terminal hostName="rpi4a" />
        {/* </Box> */}
      </Flex>
      <Flex w="full" h="500px" >
        <Terminal hostName="rpi4b" />
        <Terminal hostName="rpi5a" />
        {/* <div>f</div> */}
        {/* <Terminal host="ubuntu-1" /> */}
        {/* </Box> */}
      </Flex>
    </Flex>
  );
};

export default AllTerminals;
