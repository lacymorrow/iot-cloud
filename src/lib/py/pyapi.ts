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
  ssid?: string;
  quality?: number;
}> => {
  const data = await pycall('getWifiInfo').catch(() => {
    return {};
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
    .filter((_e: string, i: number) => i > 0 && i < data.length - 1)
    .map((e: string) => e.trim());
  return networks;
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
