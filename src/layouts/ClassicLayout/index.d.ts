import { ConnectProps } from '@/common/type';
import * as User from '@/models/user.d';

export interface Props extends ConnectProps, User.ModelState {
  children: JSX.Element;
}

export interface Menu {
  title: string;
  path: string;
  icon?: string;
  disabled?: boolean;
  children?: Menu[];
}
