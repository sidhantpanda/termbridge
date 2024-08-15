import React from 'react';
import Terminal from '../components/TerminalContainer';
import { Box, Flex, Spacer } from '@chakra-ui/react';

const AllTerminals = () => {
  return (
    <Flex direction="column" w="full" h="full">

      <Flex w="full" h="500px" >
        <Terminal host="rpi3a" />
        <Terminal host="rpi3b" />
        <Terminal host="rpi4a" />
        {/* </Box> */}
      </Flex>
      <Flex w="full" h="500px" >
        <Terminal host="rpi4b" />
        <Terminal host="rpi5a" />
        {/* <div>f</div> */}
        {/* <Terminal host="ubuntu-1" /> */}
        {/* </Box> */}
      </Flex>
    </Flex>
  );
};

export default AllTerminals;
