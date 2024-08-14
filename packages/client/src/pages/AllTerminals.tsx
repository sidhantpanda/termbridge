import React from 'react';
import Terminal from '../components/Terminal';
import { Box, Flex, Spacer } from '@chakra-ui/react';

const AllTerminals = () => {
  return (
    <Flex direction="column">

      <Flex>
        <Terminal host="rpi3a" />
        <Terminal host="rpi3b" />
        <Terminal host="rpi4a" />
        {/* </Box> */}
      </Flex>
      <Flex>
        <Terminal host="rpi4b" />
        <Terminal host="rpi5a" />
        <Terminal host="ubuntu-1" />
        {/* </Box> */}
      </Flex>
    </Flex>
  );
};

export default AllTerminals;
