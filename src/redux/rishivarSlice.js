import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Api from '../constants/Api';

export const rishivarSlice = createApi({
  reducerPath: 'rishivarSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: Api.ASTRO_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      const token = getState().auth.authToken;
      if (token) headers.set('authorization', 'Bearer ' + token)
      return headers;
    }
  }),
  endpoints: () => ({}),
});

