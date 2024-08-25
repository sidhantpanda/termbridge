import { RemoteHost } from '@termbridge/common';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useCreateOrUpdateHost } from '@/hooks/mutations/useCreateOrUpdateHost';
import { ButtonWithState } from '../ui-custom/ButtonWithState';

enum DialogMode {
  ADD = 'ADD',
  UPDATE = 'UPDATE'
}

interface CreateOrUpdateComponentRemoteHost extends Omit<RemoteHost, '_id'> {
  _id?: string;
}

interface AddOrUpdateDialogProps {
  isOpen: boolean;
  hostConfig?: CreateOrUpdateComponentRemoteHost;
  setIsOpen: (isOpen: boolean) => void;
}

export const AddOrUpdateDialog = ({ isOpen, hostConfig, setIsOpen }: AddOrUpdateDialogProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState(hostConfig?.name ?? '');
  const [host, setHost] = useState(hostConfig?.host ?? '');
  const [username, setUsername] = useState(hostConfig?.username ?? '');
  const [password, setPassword] = useState('');
  const [port, setPort] = useState(hostConfig?.port ? `${hostConfig.port}` : '22');

  const {
    createOrUpdateHost: createOrUpdateHostDryRun,
    isPending: isAddPendingDryRun,
    isSuccess: isAddSuccessDryRun,
    isError: isAddErrorDryRun,
    error: addErrorDryRun,
  } = useCreateOrUpdateHost({ isDryRun: true });

  const {
    createOrUpdateHost,
    isPending: isAddPending,
    isSuccess: isAddSuccess,
    isError: isAddError,
    error: addError,
  } = useCreateOrUpdateHost({ isDryRun: false });

  const mode = !!hostConfig?._id ? DialogMode.UPDATE : DialogMode.ADD;
  const title = mode === DialogMode.ADD ? 'Add New Host' : 'Update Host';
  const confirmButtonText = mode === DialogMode.ADD ? 'Add Host' : 'Update Host';

  useEffect(() => {
    if (isAddSuccess && !isAddError) {
      setIsOpen(false);
    }
  }, [isAddSuccess]);

  const onConfirmDryRunHandle = async () => {
    createOrUpdateHostDryRun({
      remote: {
        _id: hostConfig?._id,
        name,
        host,
        port: port === '' ? 22 : parseInt(port),
        username,
        password,
      }
    });
  }

  const onConfirmHandle = async () => {
    createOrUpdateHost({
      remote: {
        _id: hostConfig?._id,
        name,
        host,
        port: port === '' ? 22 : parseInt(port),
        username,
        password,
      }
    });
  };


  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-name" className="text-right">
            Name
          </Label>
          <Input
            id="new-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display name for the host"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-ip" className="text-right">
            IP Address
          </Label>
          <Input
            id="new-ip"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder='192.168.XXX.XXX'
            // onChange={(e) => setNewHost({ ...newHost, ip: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-username" className="text-right">
            Username
          </Label>
          <Input
            id="new-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="The username to connect on the host"
            // onChange={(e) => setNewHost({ ...newHost, ip: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-password" className="text-right">
            Password
          </Label>
          <Input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={(e) => setNewHost({ ...newHost, ip: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-port" className="text-right">
            Port
          </Label>
          <Input
            id="new-port"
            value={port}
            onChange={(e) => {
              if (e.target.value === '') {
                setPort('');
                return;
              }
              const portInt = parseInt(e.target.value);
              setPort(portInt >= 0 ? `${portInt}` : '');
            }}
            placeholder='22'
            // onChange={(e) => setNewHost({ ...newHost, ip: e.target.value })}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          disabled={isAddPendingDryRun || isAddPending}
          variant="outline"
          onClick={() => { setIsOpen(false) }}
        >
          Cancel
        </Button>
        <ButtonWithState
          variant="secondary"
          loading={isAddPendingDryRun}
          error={isAddErrorDryRun}
          success={isAddSuccessDryRun}
          disabled={isAddPendingDryRun || isAddPending}
          onClick={onConfirmDryRunHandle}
        >
          Test
        </ButtonWithState>
        <ButtonWithState
          variant="secondary"
          loading={isAddPending}
          error={isAddError}
          disabled={isAddPendingDryRun || isAddPending}
          onClick={onConfirmHandle}
        >
          {confirmButtonText}
        </ButtonWithState>
      </DialogFooter>
    </DialogContent>
  </Dialog>
};
