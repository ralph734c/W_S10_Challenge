import { configureStore } from "@reduxjs/toolkit";
import { orderListApi } from "./orderListApi";
import { pizzaFormApi } from "./pizzaFormApi";
import pizzaReducer from "./slice";

export const resetStore = () =>
  configureStore({
    reducer: {
      pizza: pizzaReducer,
      [orderListApi.reducerPath]: orderListApi.reducer,
      [pizzaFormApi.reducerPath]: pizzaFormApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(orderListApi.middleware, pizzaFormApi.middleware),
  });

export const store = resetStore();