import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaFormApi = createApi({
  reducerPath: "pizzaFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9009/api/pizza/order",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useCreateOrderMutation } = pizzaFormApi;
