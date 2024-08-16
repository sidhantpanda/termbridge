import React, { useEffect, useState } from 'react';
import { Button, Center, Flex, FormControl, FormHelperText, FormLabel, Heading, Icon, Input, InputGroup, InputLeftElement, Spacer, Stack } from '@chakra-ui/react';
import { BsHddNetwork } from "react-icons/bs";
import { FaUser } from 'react-icons/fa6';
import { MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useAddRemoteHost } from '../hooks/mutations/useAddRemoteHost';
import { useAddRemoteHostTest } from '../hooks/mutations/useAddRemoteHostTest';
import { MdOutlineCheck } from "react-icons/md";


const AddRemote = () => {
  // const { id_host } = useParams();
  // const [name, id] = id_host.split('-');
  const navigate = useNavigate();
  const { addRemoteHost, isPending: isAddPending, isSuccess: isAddSuccess } = useAddRemoteHost();
  const {
    addRemoteHostTest,
    isPending: isAddTestPending,
    isSuccess: isAddTestSuccess
  } = useAddRemoteHostTest();

  useEffect(() => {
    if (isAddSuccess) {
      navigate('/');
    }
  }, [isAddSuccess])

  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [port, setPort] = useState(-1);

  const addRemoteTest = async () => {
    await addRemoteHostTest({
      name,
      host,
      port,
      username,
      password,
    });
  };

  const addRemote = async () => {
    await addRemoteHost({
      name,
      host,
      port,
      username,
      password,
    });
  };

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
            <Input
              placeholder='RaspberryPi'
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Host Address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={BsHddNetwork} color='gray.300' />
            </InputLeftElement>
            <Input
              placeholder='192.168.XXX.XXX'
              value={host}
              onChange={(event) => {
                setHost(event.target.value);
              }}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Port</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={BsHddNetwork} color='gray.300' />
            </InputLeftElement>
            <Input
              placeholder='22'
              value={port >= 0 ? port : ''}
              onChange={(event) => {
                const stringValue = event.target.value;
                if (stringValue === '') {
                  setPort(-1);
                  return;
                }
                setPort(parseInt(event.target.value));
              }}
            />
          </InputGroup>
          <FormHelperText>Leave empty to use port 22 by default</FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FaUser} color='gray.300' />
            </InputLeftElement>
            <Input
              placeholder='admin'
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={MdOutlinePassword} color='gray.300' />
            </InputLeftElement>
            <Input
              type="password"
              placeholder='password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </InputGroup>
        </FormControl>

        <Flex direction="row">
          <Link to='/'>
            <Button colorScheme='gray' variant='solid'>
              Cancel
            </Button>
          </Link>
          <Spacer />
          <Button
            colorScheme={isAddTestSuccess ? 'green' : 'blue'}
            variant='outline'
            onClick={addRemoteTest}
            isLoading={isAddTestPending}
            disabled={isAddTestPending || isAddPending}
            rightIcon={isAddTestSuccess ? <Icon as={MdOutlineCheck} /> : null}
          >
            Test
          </Button>
          <Button
            ml="6px"
            colorScheme='blue'
            onClick={addRemote}
            isLoading={isAddPending}
            disabled={isAddTestPending || isAddPending}
          >
            Save
          </Button>

        </Flex>
      </Stack>
    </>
  );
};

export default AddRemote;
