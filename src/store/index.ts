import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core';
import { TypedUseSelectorHook, useSelector as ReactReduxUseSelector } from 'react-redux';
import app from './models/app';
import count from './models/count';
import user from './models/user';

export interface IAppStoreModels extends Models<IAppStoreModels> {
  app: typeof app;
  count: typeof count;
  user: typeof user;
}

const models: IAppStoreModels = {
  app,
  count,
  user,
};

export const store = init<IAppStoreModels>({
  models,
});

export type IRootDispatch = RematchDispatch<typeof models>;
export type IRootState = RematchRootState<typeof models>;
export type IStoreState = RematchRootState<IAppStoreModels>;
export const useSelector: TypedUseSelectorHook<IStoreState> = ReactReduxUseSelector;

export const { dispatch } = store;
