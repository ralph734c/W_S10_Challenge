import { configureStore } from "@reduxjs/toolkit";
import { orderListApi } from "./orderListApi";
import { pizzaFormApi } from "./pizzaFormApi";
import filterReducer from "./slice"

export const resetStore = () =>
  configureStore({
    reducer: {
      filter_state: filterReducer,
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
