import { useEffect, useRef } from 'react';

import QRCode from 'qrcode';

const QrCode = ({ data }: { data: string }) => {
  const qrEl = useRef(null);

  useEffect(() => {
    QRCode.toCanvas(qrEl.current, data, async (error) => {
      if (error) await window.pywebview?.api?.log(error);
      await window.pywebview?.api?.log(`Created QR: ${data}`);
    });
  }, [data]);

  return <canvas ref={qrEl}></canvas>;
};

export default QrCode;
