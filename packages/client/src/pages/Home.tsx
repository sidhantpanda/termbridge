import { useState } from 'react'
import { Input } from "@/components/ui/input"
import React from 'react'
import useRemoteHosts from '@/hooks/useRemoteHosts'
import HostCard from '@/components/HostCard/HostCard'

export default function Component() {
  let { hosts, isLoading, isFetching, isError, error } = useRemoteHosts();
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDevices = (hosts ?? []).filter(host =>
    host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.host.includes(searchTerm)
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Termbridge Dashboard</h1>
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
    </div>
  )
}
