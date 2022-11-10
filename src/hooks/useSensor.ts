import useSWR from 'swr';

import { getTemperatureHumidity } from '../lib/py/pyapi';

const useSensor = (params?: any) => {
  const { data, error } = useSWR(
    `/temperature-humidity`,
    getTemperatureHumidity,
    params
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSensor;
