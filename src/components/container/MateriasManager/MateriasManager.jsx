// src/components/MateriasManager.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  useGetMateriasQuery,
  useCreateMateriaMutation
} from '../../../features/materias/materiasApi'; 

import './MateriasManager.css'; 

const MateriasManager = () => {
  // 1) Traemos la lista de materias
  const { data: materias = [], isLoading, isError } = useGetMateriasQuery();
  // 2) Hook para crear
  const [createMateria, { isLoading: isCreating }] = useCreateMateriaMutation();

  // 3) Formik para manejar el formulario
  const formik = useFormik({
    initialValues: { nombre: '' },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Este campo es obligatorio'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createMateria(values).unwrap();
        resetForm();
      } catch (err) {
        console.error('Error al crear materia:', err);
      }
    },
  });

  if (isLoading) return <p>Cargando materias…</p>;
  if (isError)   return <p>Error al cargar materias</p>;

  return (
    <div className="materias-manager">
      {/* LISTADO */}
      <div className="materias-list">
        <h2>Materias Existentes</h2>
        <ul>
          {materias.map(m => (
            <li key={m.id}>{m.nombre}</li>
          ))}
        </ul>
      </div>

      {/* FORMULARIO */}
      <div className="materias-form">
        <h2>Agregar Nueva Materia</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              name="nombre"
              type="text"
              placeholder="Nombre de la materia"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <div className="error">{formik.errors.nombre}</div>
            )}
          </div>
          <button type="submit" disabled={isCreating}>
            {isCreating ? 'Creando…' : 'Crear Materia'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MateriasManager;
