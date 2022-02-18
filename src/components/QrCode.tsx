import { useState } from 'react';

import { Button } from 'antd';

import getHardwareId from '../lib/py/getHardwareId';

const QrCode = () => {
  const [id, setId] = useState('none');

  const onReload = async () => {
    const hwid = await getHardwareId();
    setId(hwid);
  };

  return (
    <div>
      <h1>{id}</h1>
      <Button onClick={onReload}>Reload</Button>
    </div>
  );
};

export default QrCode;
