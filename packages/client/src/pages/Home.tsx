import { useState } from 'react'
import { Input } from "@/components/ui/input"
import React from 'react'
import useRemoteHosts from '@/hooks/useRemoteHosts'
import HostCard from '@/components/HostCard/HostCard'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { AddDialog } from '@/components/HostCard/AddDialog'

export default function Component() {
  let { hosts, isLoading, isFetching, isError, error } = useRemoteHosts();
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDevices = (hosts ?? []).filter(host =>
    host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.host.includes(searchTerm)
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Termbridge Dashboard</h1>
        <Button onClick={() => { setIsAdding(true) }}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Host
        </Button>
      </div>
      <Input
        type="text"
        placeholder="Search devices..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.map((host) => (
          <HostCard key={host._id} hostConfig={host} />
        ))}
      </div>
      <AddDialog isOpen={isAdding} setIsOpen={setIsAdding} />
    </div>
  )
}
