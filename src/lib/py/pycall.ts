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

const MAX_RETRIES = 10;
const RETRY_DELAY = 500;

let failCount = 0;

/* Python API -> Shell Connection */
const pycall = (endpoint: string, params = {}) => {
  return new Promise((resolve, reject) => {
    let retries = 0;

    const run = () => {
      /**
       * If we already have run MAX_RETRIES once, fail on the first attempt:
       * We don't have pywebview.
       */
      if (retries === MAX_RETRIES || failCount > 0) {
        failCount += 1;
        return reject(
          new Error(
            `< ${endpoint} has failed. You may not be in a python browser.`
          )
        );
      }

      try {
        // const res = window.pywebview.api[endpoint](params);
        // return resolve(res);
        return resolve(params);
      } catch (e) {
        setTimeout(run, RETRY_DELAY);
      }

      retries += 1;
      return retries;
    };

    run();
  });
};

export default pycall;
