import { Identity } from '@/store/models/user/typings';
import { ButtonProps } from 'antd';

export interface IAuthButtonProps extends ButtonProps {
  auth: Identity[];
  text: string;
}
