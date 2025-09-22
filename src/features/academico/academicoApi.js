import { api } from "../api/apiSlicer";

export const academicoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContextoAcademico: builder.query({
      query: () => 'academico/contexto/',
      providesTags: ['ContextoAcademico'],
    }),
  }),
});

export const { useGetContextoAcademicoQuery } = academicoApi;
