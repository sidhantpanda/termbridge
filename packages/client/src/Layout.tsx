import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Center mt="18px">
      <Box w="1012px">
        <Outlet />
        {children}
      </Box>
    </Center >
  );
};

export default Layout;
