const config: APP_CONFIG = globalThis
  ? globalThis?.APP_CONFIG
  : window?.APP_CONFIG;

export default config;
