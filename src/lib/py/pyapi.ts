import pycall from './pycall';

export const pyget = (key: string) => {
  return pycall('get', { key }).catch(() => {
    return 'Error'; // todo
  });
};

export const pyset = (key: string, data: any) => {
  return pycall('set', { key, data }).catch(() => {
    return 'Error'; // todo
  });
};

export const getHardwareId = () => {
  return pycall('getHardwareId').catch(() => {
    return ''; // todo
  });
};

export const getIpAddress = () => {
  return pycall('getIpAddress').catch(() => {
    return ''; // todo
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
    return [];
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
    .filter(
      (el: string, index: number, array: string[]) =>
        el && index > 0 && index < array.length - 1 && el.trim()
    );

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
    return 'Error'; // todo
  });
};
