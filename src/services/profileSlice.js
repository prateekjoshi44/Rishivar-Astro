import { rishivarSlice } from "../redux/rishivarSlice";


export const extendedApiSlice = rishivarSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({ query: () => `profile`, keepUnusedDataFor: 0 }),
    patchProfile: builder.mutation({ query: (body) => ({ url: `profile`, method: "PATCH", body }) }),
  }),
});

export const {
  useGetProfileQuery, usePatchProfileMutation,

} = extendedApiSlice;
