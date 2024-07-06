import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import pizzaReducer from './slice';

export const resetStore = () =>
  configureStore({
    reducer: {
      pizza: pizzaReducer.form,
      message: pizzaReducer.message,
      [pizzaApi.reducerPath]: pizzaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pizzaApi.middleware),
  });

export const store = resetStore();
