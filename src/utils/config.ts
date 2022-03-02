const config = {
  totalImages: 5,
  site_name: 'iot-cloud',
  email: 'me@lacymorrow.com',
  title: 'Smartcloud',
  tagline: 'Firmware for iot scheduler',
  description: 'Firmware for iot scheduler',
  locale: 'en',
  errorMessage: '',
  MAX_RETRIES: 10,
  RETRY_DELAY: 500,
};

config.errorMessage = `There was an error, please email <a href="mailto:${config.email}">${config.email}</a>`;

export default config;
