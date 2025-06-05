import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './slice/authSlice';


export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });


export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];