import useSWR from 'swr';

import { getIpAddress } from '../lib/py/pyapi';

const useDevice = () => {
  const { data: ipData, error: ipError } = useSWR(`/ip-address`, getIpAddress);
  // const { data: hwId } = useSWRImmutable('/hardware-id', getHardwareId);

  return {
    device: {
      ip: ipData,
      // hwId,
    },
    isLoading: !ipError && !ipData,
    isError: ipError,
  };
};

export default useDevice;
