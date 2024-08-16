import React from 'react';
import { Button, Card, CardFooter, Center, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { RemoteHost } from '@termbridge/common';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { GrServerCluster } from 'react-icons/gr';
import { IconType } from 'react-icons';
import { BsHddNetwork } from "react-icons/bs";
import { GoTerminal, GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";


export interface HostCardProps {
  hostConfig: RemoteHost;
}

interface IconTextProps {
  icon: IconType;
  text: string;
}

const IconText = ({ icon, text }: IconTextProps) => {
  return (
    <Flex direction="row">
      <Center>
        <Icon boxSize={3} as={icon} />
      </Center>
      <Text fontSize='xs' ml="2px">{text}</Text>
    </Flex>
  );
}

const HostCard = ({ hostConfig }: HostCardProps) => {
  const { _id, name, host, username, port } = hostConfig;
  return (
    <Card p={2}>
      <Flex direction="row" >
        <Center p="6px">
          <Icon as={GrServerCluster} color='green.500' />
        </Center>
        <Flex direction="column" p="6px">

          <Text fontSize='lg'>{name}</Text>
          <IconText icon={BsHddNetwork} text={`${host}:${port}`} />
          <IconText icon={FaUser} text={username} />
        </Flex>
        <Spacer />
      </Flex>
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        p="0px"
      >
        <Link to={`remotes/${_id}/edit`}>
          <Button variant='ghost' color="gray.500" leftIcon={<Icon boxSize={3} as={GoPencil} />}>
            <Text fontSize='xs' ml="2px">Edit</Text>
          </Button>
        </Link>
        <Button variant='ghost' color="red.300" leftIcon={<Icon boxSize={3} as={IoTrashOutline} />}>
          <Text fontSize='xs' ml="2px">Remove</Text>
        </Button>
        <Link to={`remotes/${_id}-${name}/terminal`}>
          <Button variant='ghost' colorScheme="blue" leftIcon={<Icon boxSize={3} as={GoTerminal} />}>
            <Text fontSize='xs' ml="2px">Terminal</Text>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HostCard;
