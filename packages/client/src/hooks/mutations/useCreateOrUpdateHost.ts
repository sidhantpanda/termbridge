import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllRemoteHostsKey } from '../useRemoteHosts';
import { createOrUpdateHost } from '@/api/remotes/create-or-update';
import { CreateOrUpdateHostRequestBody } from '@termbridge/common';

export const useCreateOrUpdateHost = ({ isDryRun }: { isDryRun: boolean }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, mutate, ...rest } = useMutation({
    mutationFn: (body: CreateOrUpdateHostRequestBody) => {
      console.log({ body, isDryRun })
      return createOrUpdateHost({
        body,
        query: {
          dryRun: !!isDryRun ? 'true' : 'false',
        }
      });
    },
    onSettled: () => {
      if (!isDryRun) {
        queryClient.refetchQueries({
          queryKey: getAllRemoteHostsKey,
        });
      }
    }
  });
  return {
    createOrUpdateHostAsync: mutateAsync,
    createOrUpdateHost: mutate,
    ...rest,
  }
};
