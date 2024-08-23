import { RemoteHost } from '@termbridge/common';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AddDialog = ({ isOpen, setIsOpen }: EditDialogProps) => {
  // const
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Host</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-name" className="text-right">
            Name
          </Label>
          <Input
            id="new-name"
            // value={newHost.name}
            // onChange={(e) => setNewHost({ ...newHost, name: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-ip" className="text-right">
            IP
          </Label>
          <Input
            id="new-ip"
            // value={newHost.ip}
            // onChange={(e) => setNewHost({ ...newHost, ip: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="new-type" className="text-right">
            Type
          </Label>
          <Select
            // value={newHost.type}
            // onValueChange={(value) => setNewHost({ ...newHost, type: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select device type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="server">Server</SelectItem>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="smartphone">Smartphone</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        {/* <Button onClick={handleAddHost}>Add Host</Button> */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
};
