import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderListApi = createApi({
  reducerPath: 'orderListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9009/api/pizza/history",
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetOrdersQuery } = orderListApi;
