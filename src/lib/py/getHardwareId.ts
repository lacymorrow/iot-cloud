import pycall from './pycall';
import pycallSync from './pycallSync';

const getHardwareId = async () => {
  const hwid = pycallSync('getHardwareId');
  const hwid2 = await pycall('getHardwareId');
  return `${hwid} ${hwid2}`;
};

export default getHardwareId;
