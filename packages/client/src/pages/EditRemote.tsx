import React, { useEffect, useState } from 'react';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Stack
} from '@chakra-ui/react';
import { BsHddNetwork } from "react-icons/bs";
import { FaUser } from 'react-icons/fa6';
import { MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineCheck } from "react-icons/md";
import useRemoteById from '../hooks/useRemoteHostById';
import { useUpdateRemoteHost } from '../hooks/mutations/useUpdateRemoteHost';


const EditRemote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { remote, isLoading } = useRemoteById(id);
  const { udpateRemoteHost, isPending: isUpdatePending } = useUpdateRemoteHost();
  const [isUpdateTestPending, setIsUpdateTestPending] = useState(false);
  const [isUpdateTestSuccess, setIsUpdateTestSuccess] = useState(false);
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [port, setPort] = useState(-1);

  useEffect(() => {
    if (remote) {
      setName(remote.name);
      setHost(remote.host);
      setUsername(remote.username);
      setPort(remote.port);
    }
  }, [remote]);

  const updateRemoteTest = async () => {
    setIsUpdateTestPending(true);
    await udpateRemoteHost({
      id,
      update: {
        isDryRun: true,
        remote: {
          name,
          host,
          port: port >= 0 ? port : 22,
          username,
          password,
        }
      }
    });
    setIsUpdateTestPending(false);
    setIsUpdateTestSuccess(true);
  };

  const addRemote = async () => {
    await udpateRemoteHost({
      id,
      update: {
        isDryRun: false,
        remote: {
          name,
          host,
          port: port >= 0 ? port : 22,
          username,
          password,
        }
      }
    });
    navigate('/');
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Center>
        <Heading>Edit Remote</Heading>
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
              placeholder='•••••••••'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </InputGroup>
          <FormHelperText>Leave empty to keep previous password</FormHelperText>
        </FormControl>

        <Flex direction="row">
          <Link to='/'>
            <Button colorScheme='gray' variant='solid'>
              Cancel
            </Button>
          </Link>
          <Spacer />
          <Button
            colorScheme={isUpdateTestSuccess ? 'green' : 'blue'}
            variant='outline'
            onClick={updateRemoteTest}
            isLoading={isUpdateTestPending}
            disabled={isUpdatePending}
            rightIcon={isUpdateTestSuccess ? <Icon as={MdOutlineCheck} /> : null}
          >
            Test
          </Button>
          <Button
            ml="6px"
            colorScheme='blue'
            onClick={addRemote}
            isLoading={isUpdatePending && !isUpdateTestPending}
            disabled={isUpdatePending}
          >
            Update
          </Button>

        </Flex>
      </Stack>
    </>
  );
};

export default EditRemote;
