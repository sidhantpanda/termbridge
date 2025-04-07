import { useQuery } from '@tanstack/react-query';
import { getTailscaleInfo } from '@/api/remotes/get-tailscale-info';

export const useTailscaleInfoByKey = (id: string) => ['api', 'remotes', 'tailscale', id];

const useTailscaleInfo = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: useTailscaleInfoByKey(id),
    queryFn: () => {
      return getTailscaleInfo({ id });
    }
  });

  return {
    info: data,
    ...rest,
  }
};

export default useTailscaleInfo;
