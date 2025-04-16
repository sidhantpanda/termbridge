import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DockerContainer, GetTailscaleInfoResponse, RemoteHost } from '@termbridge/common';
import useAppConfig from '@/hooks/useAppConfig';

interface DockerContainerInfoProps {
  container: DockerContainer;
  tailscaleInfo?: GetTailscaleInfoResponse;
  remote: RemoteHost;
}

const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

const isValidIpv4 = (ip: string) => {
  return ipv4Regex.test(ip);
};

export const ContainerBadge = ({ remote, container, tailscaleInfo }: DockerContainerInfoProps) => {
  const { config } = useAppConfig();
  const tailscaleipv4 = tailscaleInfo?.ips?.find(ip => ipv4Regex.test(ip));
  const containerIp = !config.useTailscaleIpForContainers ? remote.host : tailscaleipv4 ? tailscaleipv4 : remote.host;

  const containerPorts = container.Ports.split(',').map((mapping) => {
    return mapping.split('->')[0].split(':')[1]
  }).filter(item => !!item)

  const containerPortsWithIp = containerPorts.map((port) => {
    return {
      port: port,
      url: `http://${containerIp}:${port}`,
    }
  });

  const containerPortLinks = containerPortsWithIp.map((item, index) => {
    return (
      <>
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {item.port}
        </a>
        {index < containerPortsWithIp.length - 1 && ', '}
      </>
    )
  }
  );



  return (
    <Badge variant="outline" className="text-xs">
      {container.Names}:
      <span className="text-xs">
        {containerPortLinks}
      </span>
    </Badge>
  )
};
