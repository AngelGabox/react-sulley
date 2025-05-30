// src/features/students/studentApi.js
import { api } from "../api/apiSlicer"; 

export const studentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    
    // Obtener todos los estudiantes
    getStudents: builder.query({
      query: () => 'estudiantes/',
      providesTags: ['Students'],
    }),

    // Obtener un estudiante por ID
    getStudentById: builder.query({
      query: (id) => `estudiantes/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Students', id }],
    }),

    // Crear estudiante
    createStudent: builder.mutation({
      query: (newStudent) => ({
        url: 'estudiantes/',
        method: 'POST',
        body: newStudent,
      }),
      invalidatesTags: ['Students'],
    }),

    // Actualizar estudiante
    updateStudent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `estudiantes/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Students', id }],
    }),

    // Eliminar estudiante
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `estudiantes/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Students', id }],
    }),
  }),
  overrideExisting: false,
});

// Exporta los hooks listos para usar en componentes
export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
