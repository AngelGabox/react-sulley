import { api } from "../api/apiSlicer";

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // Obtener todos los cursos
    getCourses: builder.query({
      query: () => 'cursos/',
      providesTags: ['Courses'],
    }),

    // Obtener curso por ID
    getCourseById: builder.query({
      query: (id) => `personas/cursos/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),

    // Crear curso
    createCourse: builder.mutation({
      query: (newCourse) => ({
        url: 'cursos/',
        method: 'POST',
        body: newCourse,
      }),
      invalidatesTags: ['Courses'],
    }),

    // Actualizar curso
    updateCourse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `cursos/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Courses', id }],
    }),

    // Eliminar curso
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `cursos/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
