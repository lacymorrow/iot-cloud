import { useRef, useState } from 'react';

import { Button } from 'antd';
import QRCode from 'qrcode';

import getHardwareId from '../lib/py/getHardwareId';

const QrCode = () => {
  const [id, setId] = useState('none');
  const [log, setlog] = useState('');
  const qrEl = useRef(null);

  const onReload = async () => {
    const hwid = await getHardwareId();
    setlog(`${log}id${hwid}`);
    setId(hwid);

    QRCode.toCanvas(qrEl.current, 'sample text', function (error) {
      if (error) console.error(error);
      console.log('success!');
    });
    window?.pywebview?.api?.log(`works`);
  };

  return (
    <div>
      <h1>{id}</h1>
      <canvas ref={qrEl}></canvas>

      <Button onClick={onReload}>Reload</Button>
      <p>{log}</p>
    </div>
  );
};

export default QrCode;
