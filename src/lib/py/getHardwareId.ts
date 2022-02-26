import pycall from './pycall';

const getHardwareId = async () => {
  const hwid = await pycall('getHardwareId');
  return hwid;
};

export default getHardwareId;
