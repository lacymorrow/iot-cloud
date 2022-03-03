import useSWR from 'swr';

import { pyget } from '../lib/py/pyapi';

const useDevicePowerStatus = (params?: any) => {
  const { data, error, mutate } = useSWR(
    `/device-power-status`,
    () => pyget('device_power_status'),
    params
  );

  return {
    mutate,
    status: data && data !== 'off',
    isLoading: !error && !data,
    isError: error,
  };
};

export default useDevicePowerStatus;
