import { History, Location } from 'history';
import { DispatchProp } from 'react-redux';
export interface Action {
  type: string;
  inherit?: boolean;
  payload?: any;
  [propsName: string]: any;
}

export interface ConnectProps {
  history: History;
  dispatch: (action: Action) => Promise<any>;
  location: Location;
  loading: { effects: any; global: boolean; models: any };
}
export interface Res {
  success: boolean;
  message: string;
  data: any;
}
