import { api } from "../api/apiSlicer"; 

export const claseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCursosDelProfesor: builder.query({
      query: (idProfesor) => `clases/profesor/${idProfesor}/`,
    }),
    getEstudiantesDelCurso: builder.query({
      query: (idCurso) => `clases/estudiantes-del-curso/${idCurso}/`,
    }),
    crearClase: builder.mutation({
      query: (nuevaClase) => ({
        url: 'clases/',
        method: 'POST',
        body: nuevaClase
      })
    }),
    registrarAsistencia: builder.mutation({
      query: (asistencia) => ({
        url: 'asistencias/',
        method: 'POST',
        body: asistencia
      })
    }),
  })
});

export const {
  useGetCursosDelProfesorQuery,
  useGetEstudiantesDelCursoQuery,
  useCrearClaseMutation,
  useRegistrarAsistenciaMutation,
} = claseApi;
