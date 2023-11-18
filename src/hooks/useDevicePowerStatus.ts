import useSWR from 'swr';

import { getDeviceStatus } from '../lib/py/pyapi';
import config from '../utils/config';

// TODO: Loading state after mutate
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
        },
    );

    console.log('useDevicePowerStatus> ', data, error);

    return {
        mutate,
        status: data ? data === '1' : false,
        isLoading: !error && typeof data === 'undefined',
        isError: error,
    };
};

export default useDevicePowerStatus;
