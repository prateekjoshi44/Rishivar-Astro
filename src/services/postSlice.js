
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        createPost: builder.mutation({ query: (body) => ({ url: `post/`, method: "POST", body }) }),
        getPosts: builder.query({ query: () => `post`, keepUnusedDataFor: 0 }),
    }),
})


export const { useCreatePostMutation, useGetPostsQuery } = extendedApiSlice
