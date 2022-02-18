import config from '../../utils/config';
import pycall from './pycall';

const getHardwareId = () => {
  const hwid = pycall('getHardwareId')
    .then((response: any) => {
      if (response?.message !== '') {
        return response.message;
      }
      throw new Error('< Error in pycall("getHardwareId")');
    })
    .catch((error) => {
      return new Promise((resolve, reject) => {
        if (config.fakeHardwareid) {
          resolve(config.fakeHardwareid);
        } else {
          reject(error);
        }
      });
    });

  return hwid;
};

export default getHardwareId;
