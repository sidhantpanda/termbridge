import { useQuery } from '@tanstack/react-query';
import { getDockerContainers } from '@/api/docker/get-containers';

export const getDockerContainersByIdKey = (id: string) => ['api', 'docker', 'containers', id];

const useDockerContainers = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: getDockerContainersByIdKey(id),
    queryFn: () => {
      return getDockerContainers({ id });
    },
  });

  return {
    containers: data?.containers ?? [],
    ...rest,
  }
};

export default useDockerContainers;
