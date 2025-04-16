import React from 'react';
import { RemoteHost } from '@termbridge/common';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { PencilIcon, ServerIcon, TrashIcon } from 'lucide-react';
import { AddOrUpdateDialog } from './AddOrUpdateDialog';
import { DeleteDialog } from './DeleteDialog';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-select';
import useAppConfig from '@/hooks/useAppConfig';
import { DockerContainerInfo } from './DockerContainerInfo/DockerContainerInfo';
import { TailscaleInfo } from './TailscaleInfo';


export interface HostCardProps {
  hostConfig: RemoteHost;
}

const HostCard = ({ hostConfig }: HostCardProps) => {
  const { _id, name, host, username, port } = hostConfig;
  const [showEditFlow, setShowEditFlow] = React.useState(false);
  const [showDeleteFlow, setShowDeleteFlow] = React.useState(false);

  const { config } = useAppConfig();

  const handleEdit = () => {
    setShowEditFlow(true);
  }

  const handleRemove = () => {
    setShowDeleteFlow(true);
  }

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ServerIcon className="h-8 w-8" />
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">IP: {host}</p>
          <p className="text-sm text-muted-foreground">Username: {username}</p>
          <p className="text-sm text-muted-foreground">Port: {port}</p>
          {config.tailscaleInfo && (
            <TailscaleInfo remoteId={_id} />
          )}

          {config.dockerContainers && (
            <>
              <Separator className="my-3" />
              <DockerContainerInfo remoteId={_id} />
            </>
          )}

        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          <Button>
            <Link to={`remotes/${_id}-${name}/terminal`}>
              {/* <ShipWheel className="h-4 w-4 mr-2" /> */}
              Connect
            </Link>
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
      </Card >
      <AddOrUpdateDialog
        isOpen={showEditFlow}
        hostConfig={hostConfig}
        setIsOpen={setShowEditFlow} />
      <DeleteDialog
        isOpen={showDeleteFlow}
        hostConfig={hostConfig}
        setIsOpen={setShowDeleteFlow} />
    </>
  );
};

export default HostCard;
