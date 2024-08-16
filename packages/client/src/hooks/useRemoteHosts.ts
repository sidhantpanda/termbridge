import { useQuery } from '@tanstack/react-query';
import { getAllRemotes } from '../api/remotes/all';

const getRemoteHostsKey = ['api', 'remotes', 'all'];

const useRemoteHosts = () => {
  const { data, ...rest } = useQuery({
    queryKey: getRemoteHostsKey,
    queryFn: getAllRemotes,
  });

  return {
    hosts: data,
    ...rest,
  }
};

export default useRemoteHosts;
