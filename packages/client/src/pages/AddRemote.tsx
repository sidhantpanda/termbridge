import React from 'react';
import { Button, Center, Flex, FormControl, FormLabel, Heading, Icon, Input, InputGroup, InputLeftElement, Spacer, Stack } from '@chakra-ui/react';
import { BsHddNetwork } from "react-icons/bs";
import { FaUser } from 'react-icons/fa6';
import { MdOutlinePassword } from "react-icons/md";
import { Link } from 'react-router-dom';

const AddRemote = () => {
  // const { id_host } = useParams();
  // const [name, id] = id_host.split('-');
  return (
    <>
      <Center>
        <Heading>Add New Remote</Heading>
      </Center>
      <Stack spacing={4} mt="18px">
        <FormControl isRequired>
          <FormLabel>Display Name</FormLabel>
          <InputGroup>
            {/* <InputLeftElement pointerEvents='none'>
              <Icon as={BsHddNetwork} color='gray.300' />
            </InputLeftElement> */}
            <Input placeholder='RaspberryPi' />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Host Address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={BsHddNetwork} color='gray.300' />
            </InputLeftElement>
            <Input placeholder='192.168.XXX.XXX' />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FaUser} color='gray.300' />
            </InputLeftElement>
            <Input placeholder='admin' />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={MdOutlinePassword} color='gray.300' />
            </InputLeftElement>
            <Input type="password" placeholder='password' />
          </InputGroup>
        </FormControl>
        <Flex direction="row">
          <Link to='/'>
            <Button colorScheme='gray' variant='solid'>
              Cancel
            </Button>
          </Link>
          <Spacer />
          <Button colorScheme="blue" variant='outline'>
            Test
          </Button>
          <Button colorScheme='blue' ml="6px">
            Save
          </Button>

        </Flex>
      </Stack>
    </>
  );
};

export default AddRemote;
