import { useQuery } from '@tanstack/react-query';
import { getAllRemotes } from '../api/remotes/all';

export const getAllRemoteHostsKey = ['api', 'remotes', 'all'];

const useRemoteHosts = () => {
  const { data, ...rest } = useQuery({
    queryKey: getAllRemoteHostsKey,
    queryFn: getAllRemotes,
  });

  return {
    hosts: data,
    ...rest,
  }
};

export default useRemoteHosts;
