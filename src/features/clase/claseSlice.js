// src/features/clase/claseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: null, 
  // current: {
  //   id, dictada_por, fecha, duracion: "HH:MM:SS",
  //   duracionSec, startedAt, endsAt, status: 'running'|'finished'
  // }
};

const claseSlice = createSlice({
  name: 'clase',
  initialState,
  reducers: {
    startClass(state, action) {
      state.current = action.payload;
    },
    endClass(state) {
      if (state.current) state.current.status = 'finished';
    },
    clearClass(state) {
      state.current = null;
    },
    hydrateFromStorage(state, action) {
      state.current = action.payload;
    },
  },
});

export const { startClass, endClass, clearClass, hydrateFromStorage } = claseSlice.actions;
export default claseSlice.reducer;
