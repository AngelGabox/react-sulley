// src/features/asistencia/asistenciaApi.js
import { api } from '../api/apiSlicer';

export const asistenciaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAsistenciaByClase: builder.query({
      query: (claseId) => `clases/${claseId}/asistencia/`,
      providesTags: (r, e, id) => [{ type: 'Asistencia', id }],
    }),
    upsertAsistencia: builder.mutation({
      query: ({ claseId, estudiante_id, estado }) => ({
        url: `clases/${claseId}/asistencia/marcar/`,
        method: 'POST',
        body: { estudiante_id, estado },
      }),
      invalidatesTags: (r, e, { claseId }) => [{ type: 'Asistencia', id: claseId }],
    }),
    getResumenAsistencia: builder.query({
      // cpmId es el id de CursoProfesorMateria
      query: (cpmId) => `clases/curso/${cpmId}/resumen-asistencia/`,
      providesTags: (result, error, cpmId) => [{ type: 'AsistenciaResumen', id: cpmId }],
    }),
  }),
});

export const {
  useGetAsistenciaByClaseQuery,
  useUpsertAsistenciaMutation,
  useGetResumenAsistenciaQuery,
} = asistenciaApi;
