import { configureStore } from "@reduxjs/toolkit";
import { orderListApi } from "./orderListApi";
import { pizzaFormApi } from "./pizzaFormApi";

const exampleReducer = (state = { count: 0 }) => {
  return state;
};

export const resetStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
      // add your reducer(s) here
      [orderListApi.reducerPath]: orderListApi.reducer,
      [pizzaFormApi.reducerPath]: pizzaFormApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(orderListApi.middleware, pizzaFormApi.middleware),
        // if using RTK Query for your networking: add your middleware here
        // if using Redux Thunk for your networking: you can ignore this
  });

export const store = resetStore();
