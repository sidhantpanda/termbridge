import DockerIcon from '@/components/icons/docker'
import React from 'react'
import { ContainerBadge } from './ComponentBadge'
import useDockerContainers from '@/hooks/useDockerContainers';
import { Loader2 } from 'lucide-react';
import useTailscaleInfo from '@/hooks/useTailscaleInfo';
import useRemoteById from '@/hooks/useRemoteHostById';

export const DockerContainerInfo = ({ remoteId }: { remoteId: string }) => {
  const { containers, isFetching, isError, isSuccess } = useDockerContainers(remoteId);
  const { info } = useTailscaleInfo(remoteId);
  const { remote } = useRemoteById(remoteId);
  if (!remote) {
    return null;
  }

  console.log('DockerContainerInfo', { containers, isFetching, isError, isSuccess });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <DockerIcon size={18} />
        <span className="text-sm font-medium">Docker Containers{' '}{isSuccess ? `(${containers.length})` : undefined}</span>
      </div>
      {isFetching && (
        <span className="text-sm text-muted-foreground">
          <Loader2 className="animate-spin" />
        </span>
      )}
      {isError && (
        <span className="text-sm text-red-500">
          Error loading containers
        </span>
      )}
      {isSuccess && containers.length === 0 && (
        <span className="text-sm text-muted-foreground">
          No containers found
        </span>
      )}
      {isSuccess && containers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {containers.map((container, index) => (
            <ContainerBadge key={index} remote={remote} container={container} tailscaleInfo={info} />
          ))}
        </div>
      )}

    </div>
  )
}