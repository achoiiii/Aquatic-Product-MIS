export interface IUserState {
  id: number;
  userId: string;
  name: string;
  phone: string;
  authority: Identity | '';
  password: string;
  type: number;
  isLogin: boolean;
}

export type Identity = '超级管理员' | '管理员' | '场长';
