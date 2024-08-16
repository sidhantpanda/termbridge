import { useMutation } from '@tanstack/react-query'
import { addRemoteHostTest } from '../../api/remotes/add-test';

export const useAddRemoteHostTest = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: addRemoteHostTest,
  });
  return {
    addRemoteHostTest: mutateAsync,
    ...rest,
  }
};
