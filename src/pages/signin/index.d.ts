import * as Signin from '@/models/signin.d';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface Props extends Signin.ModelState, ConnectProps {
  form: WrappedFormUtils;
}
