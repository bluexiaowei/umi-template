interface Define {
  URL: string;
  TITLE: string;
  AUTH_NAME: string;
  PROJECT_NAME: string;
  IGNORE_PATH: string[];
}

const WEBPACK_DEFINE: Define = {
  URL: window.URL,
  TITLE: window.TITLE,
  AUTH_NAME: window.AUTH_NAME,
  PROJECT_NAME: window.PROJECT_NAME,
  VERSION: window.VERSION,
  IGNORE_PATH: ['/signin'],
};
export default WEBPACK_DEFINE;
