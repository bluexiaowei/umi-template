interface Define {
  URL: string;
  TITLE: string;
  AUTH_NAME: string;
  PROJECT_NAME: string;
}

const WEBPACK_DEFINE: Define = {
  URL: window.URL,
  TITLE: window.TITLE,
  AUTH_NAME: window.AUTH_NAME,
  PROJECT_NAME: window.PROJECT_NAME,
  VERSION: window.VERSION,
};
export default WEBPACK_DEFINE;
