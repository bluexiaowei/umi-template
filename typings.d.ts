import { History } from 'history';
import { WrappedFormUtils } from 'antd/lib/form/Form';

declare module '*.css';
declare module '*.png';
declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.json';

declare interface Action {
  type: string;
  inherit?: boolean;
  [propsName: string]: any;
}

declare interface ConnectProps {
  history: History;
  location: Location;
  dispatch: (arg: Action) => Promise<any>;
  loading: { effects: object; global: boolean; models: object };
}

declare interface AntdForm extends WrappedFormUtils {}
