import { RemoteHost } from '@termbridge/common';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useCreateOrUpdateHost } from '@/hooks/mutations/useCreateOrUpdateHost';
import { ButtonWithState } from './ui-custom/ButtonWithState';
import { Switch } from './ui/switch';
import useAppConfig, { AppConfig } from '@/hooks/useAppConfig';



interface SettingsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SettingsDialog = ({ isOpen, setIsOpen }: SettingsDialogProps) => {


  const { config, setConfig } = useAppConfig();


  return <Dialog open={isOpen} onOpenChange={setIsOpen} >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>


      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            Show Tailscale IPs
          </Label>
        </div>
        {/* <FormControl> */}
        <Switch
          checked={config.tailscaleInfo}
          onCheckedChange={tailscaleInfo => {
            setConfig({ ...config, tailscaleInfo })
          }}
        />
        {/* </FormControl> */}
      </div>

      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            Use Tailscale IP for container links
          </Label>
        </div>
        {/* <FormControl> */}
        <Switch
          checked={config.useTailscaleIpForContainers}
          onCheckedChange={useTailscaleIpForContainers => {
            setConfig({ ...config, useTailscaleIpForContainers })
          }}
        />
        {/* </FormControl> */}
      </div>

      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            Show Docker Containers
          </Label>
        </div>
        {/* <FormControl> */}
        <Switch
          checked={config.dockerContainers}
          onCheckedChange={dockerContainers => {
            setConfig({ ...config, dockerContainers })
          }}
        />
        {/* </FormControl> */}
      </div>

    </DialogContent>
  </Dialog>
};
