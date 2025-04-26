import { useState } from 'react'
import { Input } from "@/components/ui/input"
import React from 'react'
import useRemoteHosts from '@/hooks/useRemoteHosts'
import HostCard from '@/components/HostCard/HostCard'
import { Button } from '@/components/ui/button'
import { PlusIcon, SettingsIcon } from 'lucide-react'
import { AddOrUpdateDialog } from '@/components/HostCard/AddOrUpdateDialog'
import { SettingsDialog } from '@/components/SettingsDialog'
import { Helmet } from 'react-helmet'

export default function Component() {
  let { hosts, isLoading, isFetching, isError, error } = useRemoteHosts();
  const [isAdding, setIsAdding] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const hostCards = (hosts ?? [])
    .filter(host =>
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.host.includes(searchTerm)
    ).map(host => (
      <HostCard key={host.id} hostConfig={host} />
    ));

  return (
    <>
      <Helmet>
        <title>Termbridge</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Termbridge Dashboard</h1>
          <div className='flex items-center gap-2 flex-direction-row'>
            <Button variant="outline" onClick={() => { setIsSettingsOpen(true) }}>
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <Button onClick={() => { setIsAdding(true) }}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Host
            </Button>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Search devices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hostCards}
        </div>
        <AddOrUpdateDialog isOpen={isAdding} setIsOpen={setIsAdding} />
        <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
      </div>
    </>
  )
}
