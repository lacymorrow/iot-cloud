import pycallSync from './pycallSync';

const getHardwareId = () => {
  const hwid = pycallSync('getHardwareId');
  return hwid;
};

export default getHardwareId;
