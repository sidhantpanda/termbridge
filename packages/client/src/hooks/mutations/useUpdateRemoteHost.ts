import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRemoteHost } from '../../api/remotes/update';
import { AddRemoteHostRequest } from '@termbridge/common';
import { getAllRemoteHostsKey } from '../useRemoteHosts';
import { getRemoteHostsByIdKey } from '../useRemoteHostById';

export const useUpdateRemoteHost = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (options: { id: string, update: AddRemoteHostRequest }) => {
      return updateRemoteHost(options.id, options.update);
    },
    onSettled: (_data, _error, variables, _context) => {
      queryClient.refetchQueries({
        queryKey: getAllRemoteHostsKey
      });

      queryClient.refetchQueries({
        queryKey: getRemoteHostsByIdKey(variables.id)
      });
    }
  });
  return {
    udpateRemoteHost: mutateAsync,
    ...rest,
  }
};
