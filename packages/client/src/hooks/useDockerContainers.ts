import { useQuery } from '@tanstack/react-query';
import { getDockerContainers } from '@/api/docker/get-containers';
import useAppConfig from './useAppConfig';

export const getDockerContainersByIdKey = (id: string) => ['api', 'docker', 'containers', id];

const useDockerContainers = (id: string) => {
  const { config } = useAppConfig();
  const { data, ...rest } = useQuery({
    queryKey: getDockerContainersByIdKey(id),
    queryFn: () => {
      return getDockerContainers({ id });
    },
    enabled: config.dockerContainers,
  });

  return {
    containers: data?.containers ?? [],
    ...rest,
  }
};

export default useDockerContainers;
