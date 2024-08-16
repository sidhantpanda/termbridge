import { useQuery } from '@tanstack/react-query';
import { getRemoteHosts } from '../api/config/get-remote-hosts';

const getRemoteHostsKey = ['api', 'remotes', 'all'];

const useRemoteHosts = () => {
  const { data, ...rest } = useQuery({
    queryKey: getRemoteHostsKey,
    queryFn: getRemoteHosts,
  });

  return {
    hosts: data,
    ...rest,
  }
};

export default useRemoteHosts;
