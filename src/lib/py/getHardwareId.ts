import pycall from './pycall';
import pylog from './pylog';

const getHardwareId = async () => {
  const hwid = await pycall('getHardwareId').catch((e) => {
    pylog(e);
    return 'XXXXXXX';
  });
  return hwid;
};

export default getHardwareId;
