import APP_CONFIG from './APP_CONFIG';

export default {
  [APP_CONFIG.apiPrefix]: {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
    pathRewrite: { [`^${APP_CONFIG.apiPrefix}`]: '' },
  },
};
