/**
 * PyCall - contains every possible interaction with the hardware system
 * Our explicit 3 walled garden
 *
 * Note: window.pywebview and API functions are not available immediately
 * during browser bootup. We will attempt to call the endpoint
 * 10 times with a 500ms pause before failing.
 */

/*
    Available API - defined in /pybin/api - not up to date
    -------------------------------------

    init // Hello from Python {0}'.format(sys.version)
    getIpAddress (gets wlan0 IP)
    checkWifiConnection (intemittent internet connection)
    getHardwareId (unique device id)
    showLights (runs rainbow_lights.sh)
    getRandomNumber

    Exposed at window.pywebview.api[endpoint]

*/

import config from '../../utils/config';
import { retryOperation } from '../../utils/utils';
import pylog from './pylog';

declare global {
  interface Window {
    pywebview?: any;
  }
}

/* Python API -> Shell Connection */
const pycall = (endpoint: string, params = {}) => {
  return retryOperation(
    async () => {
      try {
        await pylog(`PyCall ${endpoint}`);
        const res: string | { message: string } = await window.pywebview.api[
          endpoint
        ](params);
        // await pylog(`PyCall returned ${res}`);
        return res;
      } catch (error) {
        let errorMessage = `PyCall ${endpoint} failed: ${error}`;
        // await pylog(errorMessage);
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(errorMessage);
      }
    },
    config.RETRY_DELAY,
    config.MAX_RETRIES
  )
    .then(async (res: any) => {
      try {
        // Response is json {message: string}
        const result = JSON.parse(res);
        await pylog(`PyCall returned object ${result.message}`);
        return result.message;
      } catch (error) {
        await pylog(`PyCall returned ${res}`);
        return res;
      }
    })
    .catch(async (error) => {
      // Operation failed
      let errorMessage = `PyCall ${endpoint} failed: ${error}`;
      // await pylog(errorMessage);
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    });
};

export default pycall;
