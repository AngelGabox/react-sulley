import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlicer';
import  studentReducer  from "./students/studentSlice"
import  userReducer from './user/userSlice';
import  peopleReducer from './people/personSlice';
import courseReducer from './cursos/cursosSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // root: rootReducer,
    user: userReducer,
    student: studentReducer,
    people: peopleReducer,
    courses: courseReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

  // middleware se agrega automáticamente, incluyendo thunk
  // devTools: process.env.NODE_ENV !== 'production',
});

export default store;