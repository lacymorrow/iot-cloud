import pycall from './pycall';

export const pyget = (key: string) => {
  return pycall('get', { key }).catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return '*****';
    }
    return '';
  });
};

export const pyset = (key: string, data: any) => {
  return pycall('set', { key, data }).catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return '*****';
    }
    return '';
  });
};

export const getHardwareId = () => {
  return pycall('getHardwareId').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return '*****';
    }
    return '';
  });
};

export const getIpAddress = () => {
  return pycall('getIpAddress').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return '*****';
    }
    return '';
  });
};

export const getWifiInfo = async (): Promise<{
  ssid: string;
  quality: number;
}> => {
  const data = await pycall('getWifiInfo').catch(() => {
    return { ssid: '', quality: 0 };
  });

  // Convert quality/70 to %/100
  const quality = Math.round((Number.parseInt(data.quality, 10) / 70) * 100);
  return {
    ssid: data.ssid,
    quality,
  };
};

export const getWifiNetworks = async () => {
  const data = await pycall('getWifiNetworks').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return 'ESSID: Castle \n ESSID: io \n';
    }
    return '';
  });
  const networks = data
    .split('ESSID:')
    // Remove newline and quotes
    .map((e: string) => e.trim().replace(/^"|"$/g, ''))
    // Filter only unique values
    .filter(
      (el: string, index: number, array: string[]) =>
        array.indexOf(el) === index
    )
    // Filter falsy values
    .filter((el: string) => el);

  return networks;
};

export const setWifiNetwork = async (ssid: string, password: string) => {
  const data = await pycall('setWifiNetwork', { ssid, password }).catch(() => {
    return [];
  });
  return data;
};

export const update = () => {
  return pycall('update', { retry: false }).catch(() => {
    return 'Error Updating';
  });
};

export const removeAllStorage = () => {
  return pycall('removeAllStorage').catch(() => {
    return 'Error removing storage'; // todo
  });
};
