import { createModel } from '@rematch/core';
import { IAppStoreModels } from '@/store';
import { IUserState } from './typings';
import { encrypt } from '@/utils/encrypt';
import request from '@/request';

const defaultState: IUserState = {
  isLogin: false,
  name: '',
  authority: '',
  id: -1,
  userId: '',
  phone: '',
  password: '',
  type: -1,
};
export default createModel<IAppStoreModels>()({
  state: defaultState,
  reducers: {
    update(state: IUserState, payload: Partial<IUserState>): IUserState {
      return { ...state, ...payload };
    },

    reset(state: IUserState, payload?: Partial<IUserState>) {
      return {
        ...defaultState,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async login(params) {
      const res = await request.basic.login(params.username, encrypt(params.password).toString(), params.token);
      return res;
    },
    async logout() {
      await request.basic.logout();
      dispatch.user.reset();
    },
  }),
});
