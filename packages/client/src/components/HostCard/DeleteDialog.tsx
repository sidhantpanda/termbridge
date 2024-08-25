import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { RemoteHost } from '@termbridge/common';
import { useRemoveRemote } from '@/hooks/mutations/useRemoveRemote';
import { ButtonWithState } from '../ui-custom/ButtonWithState';

interface EditDialogProps {
  isOpen: boolean;
  hostConfig: RemoteHost;
  setIsOpen: (isOpen: boolean) => void;
}

export const DeleteDialog = ({ isOpen, hostConfig, setIsOpen }: EditDialogProps) => {
  const { removeRemote, isPending, isError, isSuccess } = useRemoveRemote();

  useEffect(() => {
    if (!isPending && isSuccess && !isError) {
      setIsOpen(false);
    }
  }, [isSuccess, isPending, isError])
  const handleRemove = () => {
    removeRemote({ id: hostConfig._id });
  }
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete {hostConfig.name} ({hostConfig.host})? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => { setIsOpen(false) }}>Cancel</Button>
        <ButtonWithState variant="destructive" loading={isPending} error={isError} onClick={handleRemove}>Delete</ButtonWithState>
      </DialogFooter>
    </DialogContent>
  </Dialog>
};
