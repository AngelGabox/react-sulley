// src/features/actividades/actividadesApi.js
import { api } from '../api/apiSlicer'; // tu base (con prepareHeaders que añade Authorization)

export const actividadesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Listar actividades del curso (del profe actual por defecto o de todos con ?todas=1)
    getActividadesPorCurso: builder.query({
      query: ({ cursoId, todas = 0 }) =>
        `actividades/curso/${cursoId}/?todas=${todas ? 1 : 0}`,
      providesTags: (result, error, { cursoId }) => [
        { type: 'Actividades', id: `curso-${cursoId}` },
      ],
    }),

    // Crear actividad en un curso (y asigna a todos los estudiantes del curso)
    crearActividadEnCurso: builder.mutation({
      query: ({ cursoId, payload }) => ({
        url: `actividades/curso/${cursoId}/crear/`,
        method: 'POST',
        body: payload, // { titulo, descripcion, fecha, fecha_entrega?, cpm_id }
      }),
      invalidatesTags: (result, error, { cursoId }) => [
        { type: 'Actividades', id: `curso-${cursoId}` },
      ],
    }),

    // Detalle con entregas por estudiante
    getDetalleActividad: builder.query({
      query: (actividadId) => `actividades/${actividadId}/detalle/`,
      providesTags: (result, error, actividadId) => [
        { type: 'Actividad', id: actividadId },
        { type: 'Entregas', id: `actividad-${actividadId}` },
      ],
    }),

    // Actualizar fecha de entrega / texto / etc. de la actividad
    actualizarActividad: builder.mutation({
      query: ({ actividadId, data }) => ({
        url: `actividades/${actividadId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (r, e, { actividadId }) => [
        { type: 'Actividad', id: actividadId },
        { type: 'Entregas', id: `actividad-${actividadId}` },
      ],
    }),

    // Eliminar actividad
    eliminarActividad: builder.mutation({
      query: (actividadId) => ({
        url: `actividades/${actividadId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (r, e, actividadId) => [
        { type: 'Actividad', id: actividadId },
        { type: 'Entregas', id: `actividad-${actividadId}` },
      ],
    }),

    // Actualizar entrega/calificación de un estudiante (no duplica registros)
    actualizarEntrega: builder.mutation({
      query: ({ actividadEstudianteId, data }) => ({
        url: `actividades/entrega/${actividadEstudianteId}/`,
        method: 'PATCH',
        body: data, // { entregado_en?, calificacion? }
      }),
      invalidatesTags: (r, e, { actividadEstudianteId, actividadId }) => [
        { type: 'Entregas', id: `actividad-${actividadId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActividadesPorCursoQuery,
  useCrearActividadEnCursoMutation,
  useGetDetalleActividadQuery,
  useActualizarActividadMutation,
  useEliminarActividadMutation,
  useActualizarEntregaMutation,
} = actividadesApi;
