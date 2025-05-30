import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: 'http://127.0.0.1:8000/',
  }),
  endpoints: (build) => ({}),
})