import { useMutation } from '@tanstack/react-query'
import { addRemoteHost } from '../../api/remotes/add'
import { updateRemoteHost } from '../../api/remotes/update';
import { AddRemoteHostRequest } from '@termbridge/common';

export const useUpdateRemoteHost = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (options: { id: string, update: AddRemoteHostRequest }) => {
      return updateRemoteHost(options.id, options.update);
    }
  });
  return {
    udpateRemoteHost: mutateAsync,
    ...rest,
  }
};
