import { timeout } from '../../utils/utils';

const pylog = async (text: string | number) => {
  console.log(`[Pylog] ${text}`);
  await timeout(
    (async () => {
      await window.pywebview?.api?.log(text);
      return true;
    })(),
    1000
  ).catch((error) => console.log(`[Pylog] ${text} error: ${error}`));
};

export default pylog;
