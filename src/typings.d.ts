interface APP_CONFIG {
  apiPrefix: string;
  appTitle: string;
  codename: string;
  patternPWD: RegExp;
  uploadMaxLength: number;
  uploadSingleSize: number;
}

interface Window {
  APP_CONFIG: APP_CONFIG;
}

interface Global {
  APP_CONFIG: APP_CONFIG;
}
