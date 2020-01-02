declare module '*.css';
declare module '*.png';
declare module '*.json';
declare module '*.less';
declare module 'roadhog-api-doc';

interface Action {
  type: string;
  inherit?: boolean;
  payload?: any;
  [propsName: string]: any;
}
