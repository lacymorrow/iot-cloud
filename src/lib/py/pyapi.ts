import { mutate } from 'swr';

import pycall from './pycall';
import config from '../../utils/config';
import { timeout } from '../../utils/utils';

// log errors
// ERROR HANDLING
export const pyget = (key: string) => {
  // DEBUG
  if (process.env.NODE_ENV === 'development') {
    const item = JSON.parse(localStorage.getItem(key) || '');
    console.log(`Dev Pyget Got: ${key}, ${item}`);
    return item;
  }

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
      return '';
    });
};

export const pyset = (key: string, data: any) => {
  console.log(`Setting: ${key}, ${data}`);

  return pycall('set', { key, data }).catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      return localStorage.setItem(key, JSON.stringify(data));
    }
    console.log(`Pyset error: `, error);
    return '';
  });
};

export const deviceOn = () => {
  return pycall('deviceOn').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev deviceOn> Using local storage');
      return localStorage.setItem('deviceStatus', '1');
    }
    return 'error';
  });
};

export const deviceOff = () => {
  return pycall('deviceOff').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev deviceOff> Using local storage');
      return localStorage.setItem('deviceStatus', '0');
    }
    return 'error';
  });
};

export const getDeviceStatus = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Dev getDeviceStatus> Getting status from local storage');
    return localStorage.getItem('deviceStatus');
  }

  return pycall('getDeviceStatus').catch(() => {
    return 'error';
  });
};

export const getHardwareId = () => {
  return pycall('getHardwareId').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev getHardwareId> HWID set to 123456');
      return '123456';
    }
    return '';
  });
};

export const getIsNetworkConnected = async () => {
  const data = await timeout(
    (() =>
      pycall('checkWifiConnection').catch(() => {
        return false;
      }))(),
    config.NETWORK_TIMEOUT,
  );

  return data;
};

export const getIpAddress = () => {
  return pycall('getIpAddress').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev getIpAddress> IP set to 000.000.000.000');
      return '000.000.000.000';
    }
    return '';
  });
};

export const getSavedNetworks = () => {
  return pyget('network_list');
};

export const getTemperatureHumidity = async (): Promise<{
  temperature: string;
  humidity: string;
}> => {
  const data = await pycall('getTemperatureHumidity').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return {
        temperature: Math.trunc(Math.random() * 100),
        humidity: Math.trunc(Math.random() * 100),
      };
    }

    return { temperature: '---', humidity: '---' };
  });

  return data;
};

// Get wifi card info
export const getWifiInfo = async (): Promise<{
  ssid: string;
  quality: number;
}> => {
  const data = await pycall('getWifiInfo').catch(() => {
    if (process.env.NODE_ENV === 'development') {
      return { ssid: 'dev', quality: 0 };
    }
    return { ssid: 'error', quality: 0 };
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
        array.indexOf(el) === index,
    )
    // Filter falsy values
    .filter((el: string) => el);

  return networks;
};

export const setDevicePower = async (status: boolean) => {
  console.log(`setDevicePower> Setting device power to ${status}`);
  await mutate('/device-power', status);

  if (status) {
    // turn on
    console.log(await deviceOn());
  } else {
    // turn off
    console.log(await deviceOff());
  }

  // TODO: Remove timeout
  // setTimeout(async () => {
  //   console.log(await mutate('/device-power', status));
  // }, config.RETRY_DELAY);
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
    if (process.env.NODE_ENV === 'development') {
      return localStorage.clear();
    }

    return 'Error removing storage'; // todo
  });
};
