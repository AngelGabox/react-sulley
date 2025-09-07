import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: null,       // { id, username, email, rol, ... }
  persona: null,    // { id, nombre, apellido, ... }
  access: null,
  refresh: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, access, refresh } = action.payload
      state.user = user || null;
      state.access = access || null;
      state.refresh = refresh || null;
    },
    setPersona: (state, action) => {
      state.persona = action.payload || null;
    },
    hydrateFromStorage: (state) => {
      try {
        const stUser = sessionStorage.getItem('user');
        const stPersona = sessionStorage.getItem('persona');
        const access = localStorage.getItem('access');
        const refresh = localStorage.getItem('refresh');
        if (stUser) state.user = JSON.parse(stUser);
        if (stPersona) state.persona = JSON.parse(stPersona);
        state.access = access || null;
        state.refresh = refresh || null;
      } catch(err) {
        console.log('hydrateFromStorage: ', err);
      }
    },
    logoutUser(state) {
      state.user = null;
      state.persona = null;
      state.access = null;
      state.refresh = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('persona');
    },

  },
});

export const { setCredentials, setPersona, hydrateFromStorage, logout, logoutUser } = userSlice.actions;
export default userSlice.reducer;
