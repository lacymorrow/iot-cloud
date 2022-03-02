import useSWR from 'swr';

import { getIpAddress } from '../lib/py/pyapi';

const useNetwork = () => {
  const { data, error } = useSWR(`/ip-address`, getIpAddress);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useNetwork;
