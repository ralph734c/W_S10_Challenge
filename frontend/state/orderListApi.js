import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderListApi = createApi({
  reducerPath: "orderListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9009/api/pizza/history",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "",
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery } = orderListApi;
