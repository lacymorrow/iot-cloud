import useSWR from 'swr';

import { getWifiInfo } from '../lib/py/pyapi';

const useWifiInfo = (params?: any) => {
  const { data, error, mutate } = useSWR(`/wifi-info`, getWifiInfo, params);

  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useWifiInfo;
