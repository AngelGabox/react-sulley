import { api } from '../api/apiSlicer';

export const actividadesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActividadesPorCurso: builder.query({
      query: ({ cursoId, todas = 0 }) => `actividades/curso/${cursoId}/?todas=${todas}`,
    }),

    crearActividadEnCurso: builder.mutation({
      query: ({ cursoId, payload }) => ({
        url: `actividades/curso/${cursoId}/crear/`,
        method: 'POST',
        body: payload,
      }),
    }),

    // Entregas desde la tabla relación (server-side filter)
    getEntregasByActividad: builder.query({
      query: ({ actividadId, estado = 'entregadas' }) =>
        `actividades/actividad/${actividadId}/entregas/?estado=${estado}`,
      providesTags: (r, e, args) => [{ type: 'Entregas', id: `${args.actividadId}:${args.estado}` }],
    }),

    actualizarEntrega: builder.mutation({
      query: ({ actividadEstudianteId, data }) => ({
        url: `actividades/entrega/${actividadEstudianteId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (r, e, { actividadId }) => [
        { type: 'Entregas', id: `${actividadId}:entregadas` },
        { type: 'Entregas', id: `${actividadId}:pendientes` },
        { type: 'Entregas', id: `${actividadId}:todas` },
      ],
    }),

    // Subir archivo de entregable (cuando lo uses)
    subirEntregable: builder.mutation({
      query: ({ actividadEstudianteId, formData }) => ({
        url: `actividades/entrega/${actividadEstudianteId}/archivo/`,
        method: 'POST',
        body: formData, // FormData con key 'entregable'
      }),
      invalidatesTags: (r, e, { actividadId }) => [
        { type: 'Entregas', id: `${actividadId}:entregadas` },
        { type: 'Entregas', id: `${actividadId}:pendientes` },
        { type: 'Entregas', id: `${actividadId}:todas` },
      ],
    }),

    // >>> NUEVOS: actualizar y eliminar actividad
    actualizarActividad: builder.mutation({
      query: ({ actividadId, data }) => ({
        url: `actividades/${actividadId}/`,
        method: 'PATCH',
        body: data,
      }),
    }),

    eliminarActividad: builder.mutation({
      query: (actividadId) => ({
        url: `actividades/${actividadId}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetActividadesPorCursoQuery,
  useCrearActividadEnCursoMutation,
  useGetEntregasByActividadQuery,
  useActualizarEntregaMutation,
  useSubirEntregableMutation,
  useActualizarActividadMutation,
  useEliminarActividadMutation,
} = actividadesApi;
