import { useMutation } from '@tanstack/react-query'
import { addRemoteHost } from '../../api/remotes/add'

export const useAddRemoteHost = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: addRemoteHost
  });
  return {
    addRemoteHost: mutateAsync,
    ...rest,
  }
};
