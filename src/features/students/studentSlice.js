// src/features/students/studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalActivo: false,
  estudianteSeleccionado: null,
  filtroCurso: '',
  estudiantes: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
     setEstudiantes: (state, action) => {
      state.estudiantes = action.payload;
    },

    toggleModal: (state) => {
      state.modalActivo = !state.modalActivo;
    },

    setEstudianteSeleccionado: (state, action) => {
      state.estudianteSeleccionado = action.payload;
    },

    setFiltroCurso: (state, action) => {
      state.filtroCurso = action.payload;
    },
  },
});

export const {
  setEstudiantes,
  toggleModal,
  setEstudianteSeleccionado,
  setFiltroCurso,
} = studentSlice.actions;

export default studentSlice.reducer;
