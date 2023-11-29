import { createModel } from '@rematch/core';
import { IAppStoreModels } from '@/store';
import { IUserState } from './typings';

const defaultState: IUserState = {
  isLogin: false,
  nickname: 'Achoi',
  identity: 'normal',
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
    async login() {
      dispatch.user.update({ isLogin: true, nickname: 'Logined AChoi', identity: 'admin' });
    },
    async logout() {
      dispatch.user.reset();
    },
  }),
});
