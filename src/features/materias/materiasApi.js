import { api } from "../api/apiSlicer";

export const materiasApi = api.injectEndpoints({
  endpoints: builder => ({


    // Obtener Materias
    getMaterias: builder.query({
      query: () => '/materias/',
      providesTags: ['Materias'],
    }),


    // Crear Materias
    createMateria: builder.mutation({
      query: newM => ({
        url: '/materias/',
        method: 'POST',
        body: newM,
      }),
      invalidatesTags: ['Materias'],
    }),


    // Actualizar Materia
    updateMateria: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/materias/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Materias', id }]
    }),


    // Eliminar Materia
    deleteMateria: builder.mutation({
      query: (id) => ({
        url: `materias/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Materias', id }],
    }),
  }),
});

export const { 
    useGetMateriasQuery, 
    useCreateMateriaMutation, 
    useUpdateMateriaMutation,
    useDeleteMateriaMutation,
} = materiasApi;
