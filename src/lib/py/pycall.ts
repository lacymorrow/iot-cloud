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

declare global {
  interface Window {
    pywebview?: any;
  }
}

/* Python API -> Shell Connection */
const pycall = (endpoint: string, params = {}) => {
  return new Promise((resolve, reject) => {
    if (window?.pywebview) {
      window.pywebview.api.log(`PyCall ${endpoint}`);
      let retries = 0;

      const run = async () => {
        window.pywebview.api.log(`retries ${retries}`);
        /**
         * If we already have run MAX_RETRIES once, fail on the first attempt:
         * We don't have pywebview.
         */
        if (retries === config.MAX_RETRIES) {
          const error = `< ${endpoint} has failed. You may not be in a python browser.`;
          window.pywebview.api.log(error);
          return reject(new Error(error));
        }

        try {
          const res = await window.pywebview.api[endpoint](params);

          window.pywebview.api.log(`result ${res}`);
          return resolve(res);
        } catch (e) {
          setTimeout(run, config.RETRY_DELAY);
        }

        retries += 1;
        return retries;
      };

      run();
    }

    return reject(new Error(`< ${endpoint} has failed.`));
  });
};

export default pycall;
