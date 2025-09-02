// src/features/asistencia/asistenciaApi.js
import { api } from '../api/apiSlicer';

export const asistenciaApi = api.injectEndpoints({
  endpoints: (builder) => ({
     getAsistenciaByCPM: builder.query({
      query: ({ cpmId, fecha }) =>
        `clases/asistencias/cpm/${cpmId}/?fecha=${fecha}`,
      providesTags: (r, e, args) => [{ type: 'Asistencia', id: `${args.cpmId}:${args.fecha}` }],
    }),
    upsertAsistencia: builder.mutation({
      query: ({ cpmId, fecha, estudiante_id, estado }) => ({
        url: `clases/asistencias/cpm/${cpmId}/upsert/`,
        method: 'POST',
        body: { fecha, estudiante_id, estado },
      }),
      invalidatesTags: (r, e, { cpmId, fecha }) => [{ type: 'Asistencia', id: `${cpmId}:${fecha}` }],
    }),
    getFechasConAsistencia: builder.query({
      query: (cpmId) => `clases/asistencias/cpm/${cpmId}/fechas/`,
      providesTags: (r, e, id) => [{ type: 'AsistenciaFechas', id }],
    }),
    getResumenAsistencia: builder.query({
      query: (cpmId) => `clases/asistencias/cpm/${cpmId}/resumen/`,
    }),
  }),
});

export const {
  useGetAsistenciaByCPMQuery,
  useUpsertAsistenciaMutation,
  useGetFechasConAsistenciaQuery,
  useGetResumenAsistenciaQuery,
} = asistenciaApi;
