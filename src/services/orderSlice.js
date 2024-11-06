
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({ query: () => `order`, keepUnusedDataFor: 0 }),
        getOrder: builder.query({ query: (id) => `order?id=${id}`, keepUnusedDataFor: 0 }),
    }),
})


export const { useGetOrderQuery, useGetOrdersQuery } = extendedApiSlice
