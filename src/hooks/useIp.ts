import useSWR from 'swr';

import { getIpAddress } from '../lib/py/pyapi';

const useIp = (params?: any) => {
  const { data: ip, error } = useSWR(`/ip-address`, getIpAddress, params);

  return {
    ip,
    isLoading: !error && !ip,
    isError: error,
  };
};

export default useIp;
