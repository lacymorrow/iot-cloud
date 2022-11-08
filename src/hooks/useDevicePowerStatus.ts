import useSWR from 'swr';

import { getDeviceStatus } from '../lib/py/pyapi';

const useDevicePowerStatus = (params?: any) => {
  const { data, error, mutate } = useSWR(
    `/device-power-status`,
    getDeviceStatus,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      ...params,
    }
  );

  return {
    mutate,
    status: data && data !== 'off',
    isLoading: !error && !data,
    isError: error,
  };
};

export default useDevicePowerStatus;
