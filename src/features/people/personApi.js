import { api } from "../api/apiSlicer"; 

export const personApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getMyPersona: builder.query({
      query: () => 'personas/me/', // <- endpoint nuevo
    }),
    updateMyPersona: builder.mutation({
      query: (patchBody) => ({
        url: 'personas/me/',
        method: 'PATCH',
        body: patchBody,
      }),
      invalidatesTags: ['Persona'],
    }),
    // Obtener todos las personas
    getPeople: builder.query({
      query: () => 'personas/',
      providesTags: ['People'],
    }),

    // Obtener un estudiante por ID
    getPersonById: builder.query({
      query: (id) => `personas/${id}/`,
      providesTags: (result, error, id) => [{ type: 'People', id }],
    }),

    // Crear estudiante
    createPerson: builder.mutation({
      query: (newPerson) => ({
        url: 'personas/',
        method: 'POST',
        body: newPerson,
      }),
      invalidatesTags: ['People'],
    }),

    // Actualizar persona
    updatePerson: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `personas/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'People', id }],
    }),

    // Eliminar persona
    deletePerson : builder.mutation({
      query: (id) => ({
        url: `personas/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'People', id }],
    }),

    searchPeople: builder.query({
      query: (q) => `personas/buscar/?q=${encodeURIComponent(q)}`,
    }),
  }),
    
  overrideExisting: false,
});

// Exporta los hooks listos para usar en componentes
export const {
  useGetMyPersonaQuery,
  useGetPeopleQuery,
  useGetPersonByIdQuery,
  useCreatePersonMutation,
  useUpdatePersonMutation,
  useDeletePersonMutation,
  useLazySearchPeopleQuery,
  useLazyGetMyPersonaQuery,
  useUpdateMyPersonaMutation,
} = personApi;
