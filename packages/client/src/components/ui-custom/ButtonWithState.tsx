import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { Check, CircleAlert, Loader2 } from 'lucide-react';
import { error } from 'console';

interface ButtonWithStateProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  error?: boolean;
}

export const ButtonWithState = React.forwardRef<HTMLButtonElement, ButtonWithStateProps>(
  ({ loading, success, error, children, ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {success && <Check />}
        {error && <CircleAlert />}
        {children}
      </Button>
    );
  }
);
