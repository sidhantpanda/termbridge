import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeRemote } from '../../api/remotes/remove';
import { getAllRemoteHostsKey } from '../useRemoteHosts';
import { getRemoteHostsByIdKey } from '../useRemoteHostById';

export const useRemoveRemote = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: removeRemote,
    onSettled: (_data, _error, variables, _context) => {
      queryClient.refetchQueries({
        queryKey: getAllRemoteHostsKey,
      });
    }
  });
  return {
    removeRemote: mutateAsync,
    ...rest,
  }
};
