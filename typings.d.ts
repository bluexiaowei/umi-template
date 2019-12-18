declare module '*.css';
declare module '*.png';
declare module '*.json';
declare module '*.less';
declare module 'roadhog-api-doc';

declare interface Action {
  type: string;
  payload?: any;
  inherit?: boolean;
}

declare interface ConnectProps {
  history: History;
  location: Location;
  dispatch: (params: Action) => Promise<any>;
  loading: { effects: any; global: boolean; models: object };
  children?: React.ReactNode | React.ReactNode[];
}
