
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        postUpload: builder.mutation({ query: (body) => ({ url: `upload`, method: "POST", body }) }),
    }),
})


export const { usePostUploadMutation } = extendedApiSlice
