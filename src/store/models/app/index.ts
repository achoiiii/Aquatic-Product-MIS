import { createModel } from '@rematch/core';
import { IAppStoreModels } from '@/store';
import { IInitialData } from './typings';
const defaultState: IInitialData = {
  sites: [
    {
      siteNo: 1,
      name: '一场',
      custodian: '一场长',
      pools: [
        { poolNo: 101, area: 100, quantity: 20000, weight: 200, type: 1 },
        { poolNo: 102, area: 100, quantity: 20000, weight: 200, type: 0 },
        { poolNo: 103, area: 100, quantity: 20000, weight: 200, type: 0 },
        { poolNo: 104, area: 100, quantity: 20000, weight: 200, type: 1 },
        { poolNo: 105, area: 100, quantity: 20000, weight: 200, type: 1 },
        { poolNo: 106, area: 100, quantity: 20000, weight: 200, type: 0 },
      ],
    },
    {
      siteNo: 2,
      name: '二场',
      custodian: '二场长',
      pools: [
        { poolNo: 201, area: 100, quantity: 20000, weight: 200, type: 0 },
        { poolNo: 202, area: 100, quantity: 20000, weight: 200, type: 1 },
        { poolNo: 203, area: 100, quantity: 20000, weight: 200, type: 0 },
        { poolNo: 204, area: 100, quantity: 20000, weight: 200, type: 1 },
        { poolNo: 205, area: 100, quantity: 20000, weight: 200, type: 0 },
        { poolNo: 206, area: 100, quantity: 20000, weight: 200, type: 1 },
        { poolNo: 207, area: 100, quantity: 20000, weight: 200, type: 1 },
      ],
    },
    {
      siteNo: 3,
      name: '三场',
      custodian: '三场长',
      pools: [
        { poolNo: 301, area: 100, quantity: 20000, weight: 200, type: 0 },
        { poolNo: 302, area: 100, quantity: 20000, weight: 200, type: 1 },
        { poolNo: 303, area: 100, quantity: 20000, weight: 200, type: 0 },
        { poolNo: 304, area: 100, quantity: 20000, weight: 200, type: 1 },
      ],
    },
  ],
  oldCoefficient: 2.0,
  newCoefficient: 1.6,
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
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload: number, state) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
});
