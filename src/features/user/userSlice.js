import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nombre: '',
  logueado: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.nombre = action.payload;
      state.logueado = true;
    },
    logout: (state) => {
      state.nombre = '';
      state.logueado = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;