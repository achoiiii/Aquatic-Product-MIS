import { createModel } from '@rematch/core';
import { IAppStoreModels } from '@/store';
import { IUserState } from './typings';

const defaultState: IUserState = {
  isLogin: false,
  nickname: 'Achoi',
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
      dispatch.user.update({ isLogin: true, nickname: 'Logined AChoi' });
    },
    async logout() {
      dispatch.user.reset();
    },
  }),
});
