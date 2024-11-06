
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getChats: builder.query({ query: () => `chat`, keepUnusedDataFor: 0 }),
        getChat: builder.query({ query: (id) => `chat?id=${id}`, keepUnusedDataFor: 0 }),
        patchChat: builder.mutation({ query: (body) => ({ url: `chat`, method: "PATCH", body }) }),


        postMessage: builder.mutation({ query: (body) => ({ url: `chat/chatItem`, method: "POST", body }) }),


    }),
})


export const { useGetChatsQuery, useGetChatQuery, usePatchChatMutation, usePostMessageMutation } = extendedApiSlice
