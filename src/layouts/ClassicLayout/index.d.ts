import { ConnectProps } from '@/common/type';
import * as User from '@/models/user.d';

export interface Props extends ConnectProps, User.ModelState {}
