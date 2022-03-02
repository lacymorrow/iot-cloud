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
const pycall = (endpoint: string, params: any = {}) => {
  return retryOperation(
    async () => {
      try {
        await pylog(`PyCall ${endpoint}`);
        const response: string | { message: string } =
          await window.pywebview.api[endpoint](params)
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
            .then((res: any) => {
              // Response contained an error
              if (res.error) {
                throw res.error;
              }
              return res;
            });
        return response;
      } catch (error) {
        let errorMessage = `${endpoint} failed: ${error}`;
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        await pylog(`Pycall error (retrying): ${errorMessage}`);
        throw new Error(errorMessage);
      }
    },
    (params?.retry === false && 1) || config.RETRY_DELAY,
    config.MAX_RETRIES
  ).catch(async (error) => {
    // Operation failed
    let errorMessage = `${endpoint} failed: ${error}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    await pylog(`Pycall fatal error: ${errorMessage}`);
    throw new Error(errorMessage);
  });
};

export default pycall;
