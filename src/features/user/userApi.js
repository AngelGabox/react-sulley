import { api } from '../api/apiSlicer';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'usuarios/login/',  // Asegúrate que coincida con la URL de tu backend
        method: 'POST',
        body: credentials,
      }),
    }),

    // Registro
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'registro/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;
