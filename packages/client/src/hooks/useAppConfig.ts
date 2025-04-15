import { useQuery, useQueryClient } from '@tanstack/react-query';

export interface AppConfig {
  tailscaleInfo: boolean;
  dockerContainers: boolean;
}

const defaultConfig: AppConfig = {
  tailscaleInfo: true,
  dockerContainers: true,
};

export const useAppConfigKey = () => ['app', 'config'];

const useAppConfig = () => {
  const queryClient = useQueryClient();

  const setConfig = (config: AppConfig) => {
    localStorage.setItem('appConfig', JSON.stringify(config));
    queryClient.setQueryData(useAppConfigKey(), config);
  };


  const { data, ...rest } = useQuery({
    queryKey: useAppConfigKey(),
    queryFn: () => {
      const config = localStorage.getItem('appConfig');
      if (config) {
        return JSON.parse(config) as AppConfig;
      }
      return defaultConfig;
    }
  });

  return {
    config: data ?? defaultConfig,
    setConfig,
    ...rest,
  }
};

export default useAppConfig;
