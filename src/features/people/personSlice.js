// src/features/students/studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalActivo: false,
  selectedPerson: null,
  people: [],
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
     setPeople: (state, action) => {
      state.people = action.payload;
    },

    toggleModal: (state) => {
      state.modalActivo = !state.modalActivo;
    },

    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
  },
});

export const {
  setEstudiantes,
  toggleModal,
  setEstudianteSeleccionado,
  setFiltroCurso,
} = peopleSlice.actions;

export default peopleSlice.reducer;
