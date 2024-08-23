import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import React from 'react';
import { Button } from '../ui/button';
import { RemoteHost } from '@termbridge/common';

interface EditDialogProps {
  isOpen: boolean;
  hostConfig: RemoteHost;
  setIsOpen: (isOpen: boolean) => void;
}

export const DeleteDialog = ({ isOpen, hostConfig, setIsOpen }: EditDialogProps) => {
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
        <Button variant="destructive" onClick={() => { }}>Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
};
