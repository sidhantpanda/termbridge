import { useQuery } from '@tanstack/react-query';
import { getRemoteById } from '../api/remotes/get-by-id';

const getRemoteHostsByIdKey = (id: string) => ['api', 'remotes', 'id', id];

const useRemoteById = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: getRemoteHostsByIdKey(id),
    queryFn: () => {
      return getRemoteById({ id });
    }
  });

  return {
    remote: data,
    ...rest,
  }
};

export default useRemoteById;
