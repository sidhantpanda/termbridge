import React from 'react';
import { Card, Center, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { RemoteHost } from '@termbridge/common';
import { Link } from 'react-router-dom';
import { FaServer, FaNetworkWired, FaUser } from 'react-icons/fa6';
import { IconBaseProps, IconType } from 'react-icons';

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
  const { _id, name, host, username } = hostConfig;
  return (
    <Link to={`/terminal/${name}-${_id}`}>
      <Card key={name} p={2} m={2}>
        <Flex direction="row" >
          <Center p="6px">
            <Icon as={FaServer} color='green.500' />
          </Center>
          <Flex direction="column" p="6px">

            <Text fontSize='lg'>{name}</Text>
            <IconText icon={FaNetworkWired} text={host} />
            <IconText icon={FaUser} text={username} />
          </Flex>
          <Spacer />
        </Flex>
      </Card>
    </Link >
  );
};

export default HostCard;
