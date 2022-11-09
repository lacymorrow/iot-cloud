import useSWR from 'swr';

import { getDeviceStatus } from '../lib/py/pyapi';
import config from '../utils/config';

const useDevicePowerStatus = (params?: any) => {
  const { data, error, mutate } = useSWR(
    `/device-power-status`,
    getDeviceStatus,
    {
      refreshInterval: config.RETRY_DELAY,
      refreshWhenHidden: false,
      refreshWhenOffline: true,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      ...params,
    }
  );

  console.log('useDevicePowerStatus> ', data, error);

  return {
    mutate,
    status: data && data !== 'off' && data !== '0',
    isLoading: !error && !data,
    isError: error,
  };
};

export default useDevicePowerStatus;
