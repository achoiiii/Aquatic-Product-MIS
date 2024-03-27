import { createModel } from '@rematch/core';
import { IAppStoreModels } from '@/store';
import { IInitialData } from './typings';
import request from '@/request';
const defaultState: IInitialData = {
  sites: [],
  oldCoefficient: 2.0,
  newCoefficient: 1.6,
  isInitial: false,
};
export default createModel<IAppStoreModels>()({
  state: defaultState, // initial state
  reducers: {
    update(state: IInitialData, payload: Partial<IInitialData>): IInitialData {
      return {
        ...state,
        ...payload,
      };
    },

    reset(state: IInitialData, payload?: Partial<IInitialData>) {
      return {
        ...defaultState,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    getInitialData() {
      request.basic.getSite().then((res) => {
        dispatch.app.update({ sites: res.data, isInitial: true });
      });
    },
  }),
});
