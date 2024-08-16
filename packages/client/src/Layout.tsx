import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Center mt="18px">
      <Box w="500px">
        <Outlet />
      </Box>
    </Center >
  );
};

export default Layout;
