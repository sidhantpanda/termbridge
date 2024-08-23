import React from 'react';
import { Button, Card, CardFooter, CardHeader, Center, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { RemoteHost } from '@termbridge/common';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { GrServerCluster } from 'react-icons/gr';
import { IconType } from 'react-icons';
import { BsHddNetwork } from "react-icons/bs";
import { GoTerminal, GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { useRemoveRemote } from '../../hooks/mutations/useRemoveRemote';
import { CardContent, CardTitle } from '../ui/card';
import { PencilIcon, ServerIcon, TrashIcon } from 'lucide-react';
import { EditDialog } from './EditDialog';
import { AddDialog } from './AddDialog';
import { DeleteDialog } from './DeleteDialog';


export interface HostCardProps {
  hostConfig: RemoteHost;
}

const HostCard = ({ hostConfig }: HostCardProps) => {
  const { _id, name, host, username, port } = hostConfig;
  const navigate = useNavigate();
  const { removeRemote, isPending } = useRemoveRemote();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleConnect = () => {
    navigate(`remotes/${_id}-${name}/terminal`)
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleRemove = () => {
    // confirm(`Are you sure you want to delete ${name}?`) && removeRemote({ id: _id });
    setIsDeleting(true);
  }

  return (
    <>
      <Card w="300px">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ServerIcon className="h-8 w-8" />
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">IP: {host}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => handleConnect()} >
            Connect
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => handleEdit()}
              variant="outline"
              size="icon"
            >
              <PencilIcon className="h-4 w-8" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              onClick={() => handleRemove()}
              variant="outline"
              size="icon"
            >
              <TrashIcon className="h-4 w-8" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
      <EditDialog
        isOpen={isEditing}
        hostConfig={hostConfig}
        setIsOpen={setIsEditing} />
      <DeleteDialog
        isOpen={isDeleting}
        hostConfig={hostConfig}
        setIsOpen={setIsDeleting} />
    </>
  );
};

export default HostCard;
