import React from 'react';
import { Loader2 } from 'lucide-react';
import useTailscaleInfo from '@/hooks/useTailscaleInfo';

interface TailscaleInfoProps {
  remoteId: string;
}

export const TailscaleInfo = ({ remoteId }: TailscaleInfoProps) => {
  const { info: tailscaleInfo } = useTailscaleInfo(remoteId);

  let tailscaleNode = (<span className="text-sm text-muted-foreground"><Loader2 className="animate-spin" /></span>)
  if (tailscaleInfo && tailscaleInfo.ips) {
    tailscaleNode = (
      <ul className="list-disc list-inside">
        {tailscaleInfo.ips.map((item, key) => {
          return (
            <li key={key} >{item}</li>
          )
        })}
      </ul>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">Tailscale IP(s): {tailscaleNode}</p>
    </div>
  )
};
