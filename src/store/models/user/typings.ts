export interface IUserState {
  isLogin: boolean;
  nickname: string;
  identity: Identity;
}

export type Identity = 'admin' | 'normal' | 'top-admin';
