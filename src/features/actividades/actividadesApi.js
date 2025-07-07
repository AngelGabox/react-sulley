// features/actividades/actividadesApi.js
import { apiSlice } from '../api/apiSlice';

export const actividadesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    crearActividad: builder.mutation({
      query: (nuevaActividad) => ({
        url: 'actividades/',
        method: 'POST',
        body: nuevaActividad
      })
    }),
    obtenerMisActividades: builder.query({
      query: () => 'actividades/mis-actividades/'
    })
  })
});

export const {
  useCrearActividadMutation,
  useObtenerMisActividadesQuery
} = actividadesApi;