import React from 'react';
import { Card, Center, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { RemoteHost } from '@termbridge/common';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { GiServerRack } from 'react-icons/gi';
import { GrServerCluster, GrServer } from 'react-icons/gr';
import { IconType } from 'react-icons';
import { BsHddNetwork } from "react-icons/bs";


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
    <Link to={`remotes/${_id}-${name}/terminal`}>
      <Card key={name} p={2}>
        <Flex direction="row" >
          <Center p="6px">
            <Icon as={GrServerCluster} color='green.500' />
          </Center>
          <Flex direction="column" p="6px">

            <Text fontSize='lg'>{name}</Text>
            <IconText icon={BsHddNetwork} text={host} />
            <IconText icon={FaUser} text={username} />
          </Flex>
          <Spacer />
        </Flex>
      </Card>
    </Link >
  );
};

export default HostCard;
