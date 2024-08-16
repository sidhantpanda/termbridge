import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addRemoteHost } from '../../api/remotes/add'
import { getAllRemoteHostsKey } from '../useRemoteHosts';

export const useAddRemoteHost = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: addRemoteHost,
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: getAllRemoteHostsKey,
      });
    }
  });
  return {
    addRemoteHost: mutateAsync,
    ...rest,
  }
};
