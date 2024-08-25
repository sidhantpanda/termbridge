import { ArrowLeft, Terminal } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';

interface LoggedOutProps {
  onHomeRequested: () => void;
  onReloadTerminalRequested: () => void;
}

const LoggedOut = ({ onHomeRequested, onReloadTerminalRequested }: LoggedOutProps) => {
  const homeRequest = () => {
    console.log('Home requested');
    onHomeRequested();
  }
  const reloadTerminalRequest = () => {
    console.log('Reload Terminal requested');
    onReloadTerminalRequested();
  }
  return (
    <div className="flex flex-col items-center  min-h-screen p-4 bg-background">
      <h1 className="text-5xl font-bold mb-2 text-foreground">Termbridge</h1>
      <p className="text-xl mb-8 text-muted-foreground">Remote Session ended</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 px-6 py-4 text-base"
          onClick={homeRequest}
        >
          <ArrowLeft className="w-5 h-5" />
          Home
        </Button>
        <Button
          // variant="secondary"
          className="flex items-center justify-center gap-2 px-6 py-4 text-base"
          onClick={reloadTerminalRequest}
        >
          <Terminal className="w-5 h-5" />
          Reload Terminal
        </Button>
      </div>
    </div>
  )
};

export default LoggedOut;
