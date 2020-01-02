import * as User from '@/models/user.d';
import { ConnectProps } from '@/common/type';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface Props extends User.ModelState, ConnectProps {
  form: WrappedFormUtils;
}
