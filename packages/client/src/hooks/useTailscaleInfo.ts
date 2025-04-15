import { useQuery } from '@tanstack/react-query';
import { getTailscaleInfo } from '@/api/remotes/get-tailscale-info';
import useAppConfig from './useAppConfig';

export const useTailscaleInfoByKey = (id: string) => ['api', 'remotes', 'tailscale', id];

const useTailscaleInfo = (id: string) => {
  const { config } = useAppConfig();
  const { data, ...rest } = useQuery({
    queryKey: useTailscaleInfoByKey(id),
    queryFn: () => {
      return getTailscaleInfo({ id });
    },
    enabled: config.tailscaleInfo,
  });

  return {
    info: data,
    ...rest,
  }
};

export default useTailscaleInfo;
