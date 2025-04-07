import React from 'react';
import { RemoteHost } from '@termbridge/common';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { PencilIcon, ServerIcon, TrashIcon, ShipWheel } from 'lucide-react';
import { AddOrUpdateDialog } from './AddOrUpdateDialog';
import { DeleteDialog } from './DeleteDialog';
import { Button } from '../ui/button';
import useDockerContainers from '@/hooks/useDockerContainers';
import { Separator } from '@radix-ui/react-select';
import { Badge } from '../ui/badge';
import DockerIcon from '../icons/docker';
import useTailscaleInfo from '@/hooks/useTailscaleInfo';


export interface HostCardProps {
  hostConfig: RemoteHost;
}

const HostCard = ({ hostConfig }: HostCardProps) => {
  const { _id, name, host, username, port } = hostConfig;
  const navigate = useNavigate();
  const [showEditFlow, setShowEditFlow] = React.useState(false);
  const [showDeleteFlow, setShowDeleteFlow] = React.useState(false);
  const { containers } = useDockerContainers(_id);
  const { info: tailscaleInfo } = useTailscaleInfo(_id);

  console.log('tailscaleInfo', tailscaleInfo);
  // console.log(containers);

  const handleConnect = () => {
    navigate(`remotes/${_id}-${name}/terminal`)
  }

  const handleEdit = () => {
    setShowEditFlow(true);
  }

  const handleRemove = () => {
    // confirm(`Are you sure you want to delete ${name}?`) && removeRemote({ id: _id });
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
          <p className="text-sm text-muted-foreground">Tailscale IP(s): {tailscaleInfo ? `[${tailscaleInfo.ips.join(', ')}]`: `undefined`}</p>
          <>
            <Separator className="my-3" />
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <DockerIcon size={18} />
                <span className="text-sm font-medium">Docker Containers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {containers.map((container, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {container.Names}:
                    <span key={index} className="text-xs">
                      {container.Ports.split(',').map((mapping) => {
                        return mapping.split('->')[0].split(':')[1]
                      }).filter(item => !!item).join(', ')}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          </>
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
      </Card>
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
