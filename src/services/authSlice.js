import { rishivarSlice } from "../redux/rishivarSlice";


export const extendedApiSlice = rishivarSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({ query: (body) => ({ url: `auth/signIn`, method: "POST", body }) }),
    getProfile: builder.query({ query: () => `profile`, keepUnusedDataFor: 0 }),
    postProfile: builder.mutation({ query: (body) => ({ url: `profile`, method: "POST", body }) }),


  }),
});

export const {
  useSignInMutation,
  useGetProfileQuery,
  usePostProfileMutation

} = extendedApiSlice;
