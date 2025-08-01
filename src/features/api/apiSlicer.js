import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logoutUser } from "../user/userSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access')
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // si obtuvimos 401, intentamos refresh
  if (result.error?.status === 401) {
    const refresh = localStorage.getItem('refresh')
    if (!refresh) {
      // no tenemos refresh: logout
      api.dispatch(logoutUser())
      return result
    }
    // llamamos al refresh token endpoint
    const refreshResult = await baseQuery({
      url: 'api/token/refresh/',
      method: 'POST',
      body: { refresh }
    }, api, extraOptions)

    if (refreshResult.data) {
      // guardamos los nuevos tokens
      const { access: newAccess, refresh: newRefresh } = refreshResult.data
      localStorage.setItem('access', newAccess)
      localStorage.setItem('refresh', newRefresh)
      // actualizamos el slice de user (opcional)
      api.dispatch(setCredentials({ access: newAccess, refresh: newRefresh }))

      // reintentar la petición original con el nuevo token
      result = await baseQuery(args, api, extraOptions)
    } else {
      // refresh falló, forzamos logout
      api.dispatch(logoutUser())
    }
  }

  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User','Courses','Students', /* ... */],
  endpoints: ()=>({})
})
export const { useLoginUserMutation } = api