import config from '../../utils/config';
import { timeout } from '../../utils/utils';

const pylog = async (text: string | number) => {
  if (window.pywebview?.api?.log) {
    console.log(`[Pylog] ${text}`);
    await timeout(
      (async () => {
        await window.pywebview.api.log(text);
        return true;
      })(),
      config.TIMEOUT
    ).catch((error) => console.log(`[Pylog] ${text} error: ${error}`));
  } else {
    console.log(`[Pylog Error] ${text}`);
  }
};

export default pylog;
