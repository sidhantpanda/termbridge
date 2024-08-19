import { Button, Center, Flex, Heading, Icon, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { GoTerminal } from "react-icons/go";

interface LoggedOutProps {
  onHomeRequested: () => void;
  onReloadTerminalRequested: () => void;
}

const LoggedOut = ({ onHomeRequested, onReloadTerminalRequested }: LoggedOutProps) => {
  const homeRequest = () => {
    console.log('Home requested');
    onHomeRequested();
  }
  console.log('LoggedOut');

  const reloadTerminalRequest = () => {
    console.log('Reload Terminal requested');
    onReloadTerminalRequested();
  }
  return (
    <>
      <Center>
        <Heading>Termbridge</Heading>
      </Center>
      <Flex direction="column" mt="8px" gap="6px">
        <Center>
          <Text>Remote Session ended</Text>
        </Center>
      </Flex>
      <br />
      <Flex direction="row" gap="6px" alignContent="center" justify="center">
        <Button color="gray.500" leftIcon={<Icon boxSize={3} as={FaArrowLeft} />} onClick={homeRequest}>
          <Text fontSize='xs' ml="2px">Home</Text>
        </Button>
        <Button color="blue.400" leftIcon={<Icon boxSize={3} as={GoTerminal} />} onClick={reloadTerminalRequest}>
          <Text fontSize='xs' ml="2px">Reload Terminal</Text>
        </Button>
      </Flex>
    </>
  )
};

export default LoggedOut;
