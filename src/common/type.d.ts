import { History, Location } from 'history';
import { DispatchProp } from 'react-redux';

export interface ConnectProps {
  history: History;
  dispatch: (action: Action) => Promise<any>;
  location: Location;
  loading: { effects: any; global: boolean; models: any };
}
