import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core';
import { TypedUseSelectorHook, useSelector as ReactReduxUseSelector } from 'react-redux';
import app from './models/app'
import count from './models/count';

export interface IAppStoreModels extends Models<IAppStoreModels> {
  app: typeof app;
  count: typeof count;
}

const models: IAppStoreModels = {
  app,
  count
};

export const store = init<IAppStoreModels>({
  models,
});

export type IRootDispatch = RematchDispatch<typeof models>;
export type IRootState = RematchRootState<typeof models>;
export type IStoreState = RematchRootState<IAppStoreModels>;
export const useSelector: TypedUseSelectorHook<IStoreState> = ReactReduxUseSelector;

export const { dispatch } = store;
