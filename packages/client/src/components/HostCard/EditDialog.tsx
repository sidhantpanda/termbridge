import { RemoteHost } from '@termbridge/common';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface EditDialogProps {
  isOpen: boolean;
  hostConfig: RemoteHost;
  setIsOpen: (isOpen: boolean) => void;
}

export const EditDialog = ({ isOpen, hostConfig, setIsOpen }: EditDialogProps) => {
  const handleSaveEdit = () => {
  };
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Device</DialogTitle>
      </DialogHeader>
      {isOpen && (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              // value={editingDevice.name}
              // onChange={(e) => setEditingDevice({ ...editingDevice, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ip" className="text-right">
              IP
            </Label>
            <Input
              id="ip"
              // value={editingDevice.ip}
              // onChange={(e) => setEditingDevice({ ...editingDevice, ip: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
      )}
      <DialogFooter>
        <Button onClick={handleSaveEdit}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
};
