import { mutate } from 'swr';

import config from '../../utils/config';
import { timeout } from '../../utils/utils';
import pycall from './pycall';

// log errors
// ERROR HANDLING

export const pyget = (key: string) => {
  return pycall('get', { key })
    .then((res) => {
      console.log(`Got: `, res);
      try {
        return JSON.parse(res);
      } catch (_error) {
        return res;
      }
    })
    .catch((error) => {
      console.log(`pyget error: ${error}`);
      if (process.env.NODE_ENV === 'development') {
        return 'dev';
      }
      return '';
    });
};

export const pyset = (key: string, data: any) => {
  return pycall('set', { key, data }).catch((error) => {
    console.log(`Pyset error: `, error);
    if (process.env.NODE_ENV === 'development') {
      return 'dev';
    }
    return '';
  });
};

export const getHardwareId = () => {
  return pycall('getHardwareId').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return 'dev';
    }
    return '';
  });
};

export const getIsNetworkConnected = async () => {
  const data = await timeout(
    (() => pycall('checkWifiConnection').catch(() => { return false }))(),
    config.NETWORK_TIMEOUT
  );

  return data;
};

export const getIpAddress = () => {
  return pycall('getIpAddress').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return 'dev';
    }
    return '';
  });
};

export const getSavedNetworks = () => {
  return pyget('network_list');
};

export const getWifiInfo = async (): Promise<{
  ssid: string;
  quality: number;
}> => {
  const data = await pycall('getWifiInfo');

  // Convert quality/70 to %/100
  const quality = Math.round((Number.parseInt(data.quality, 10) / 70) * 100);
  return {
    ssid: data.ssid,
    quality,
  };
};

export const getWifiNetworks = async () => {
  const data = await pycall('getWifiNetworks').catch(() => {
    // MOCK DATA
    if (process.env.NODE_ENV === 'development') {
      return 'ESSID: Castle \n ESSID: io \n';
    }
    // TODO: FATAL ERROR - reboot?
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

export const setDevicePower = async (status: boolean) => {
  if (status) {
    // turn on
    await pyset('device_power_status', 'on');
  } else {
    // turn off
    await pyset('device_power_status', 'off');
  }

  setTimeout(() => {
    console.log(mutate('/device-power', status));
  }, config.TIMEOUT);
};

export const setWifiNetwork = async (ssid: string, password: string) => {
  const data = await pycall('setWifiNetwork', { ssid, password });
  return data;
};

export const setNewSavedNetwork = async (ssid: string, password: string) => {
  const list = await pyget('network_list');
  const data =
    typeof list === 'object'
      ? await pyset('network_list', { ...list, [ssid]: password })
      : await pyset('network_list', { [ssid]: password });

  return data;
};

export const update = () => {
  return pycall('update', { retry: false }).catch(() => {
    return 'Error Updating';
  });
};

export const removeSavedNetworks = () => {
  return pyset('network_list', []);
};

export const removeAllStorage = () => {
  return pycall('removeAllStorage').catch(() => {
    return 'Error removing storage'; // todo
  });
};
