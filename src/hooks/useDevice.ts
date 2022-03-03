import useSWR from 'swr';

import { getHardwareId } from '../lib/py/pyapi';

const useDevice = (params?: any) => {
  // const { data: ipData, error: ipError } = useSWR(`/ip-address`, getIpAddress);
  const { data: hwid, error } = useSWR('/hardware-id', getHardwareId, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...params,
  });

  return {
    hwid,
    isLoading: !error && !hwid,
    isError: error,
  };
};

export default useDevice;
