
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getCalls: builder.query({ query: () => `call`, keepUnusedDataFor: 0 }),
        getCall: builder.query({ query: (id) => `call?id=${id}`, keepUnusedDataFor: 0 }),
        patchCall: builder.mutation({ query: (body) => ({ url: `call`, method: "PATCH", body }) }),

    }),
})


export const { useGetCallQuery, useGetCallsQuery, usePatchCallMutation } = extendedApiSlice
