/**
 * PyCall - contains every possible interaction with the hardware system
 * Our explicit 3-walled garden
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

/* Python API -> Shell Connection */

// const pycallSync = (endpoint: string, params: any) => {
//   if (typeof window.pywebview !== 'undefined') {
//     return window.pywebview.api[endpoint](params);
//   }
//   return false;
// };

// export default pycallSync;
export {};
