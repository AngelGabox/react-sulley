import React, { useState } from 'react';
import { useCreateStudentMutation } from '../../../features/students/studentApi'; 
import  './CreateStudentForm.css';

const CreateStudentForm = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    nivel_academico: '',
    id_curso: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellido, id_curso } = values;

    if (nombre && apellido && id_curso) {
      try {
        await createStudent(values).unwrap();
        alert('Estudiante creado con éxito');
        setValues({
          nombre: '',
          apellido: '',
          fecha_nacimiento: '',
          direccion: '',
          telefono: '',
          correo_electronico: '',
          nivel_academico: '',
          id_curso: ''
        });
      } catch (error) {
        alert('Error al crear estudiante');
        console.error(error);
      }
    } else {
      alert('Nombre, Apellido y Curso son obligatorios');
    }
  };

  return (
    <div className={"container"}>
      <h2>Crear Estudiante</h2>
      <form className={"form"} onSubmit={handleSubmit}>
        <label>Nombre*</label>
        <input type="text" name="nombre" value={values.nombre} onChange={handleChange} required />

        <label>Apellido*</label>
        <input type="text" name="apellido" value={values.apellido} onChange={handleChange} required />

        <label>Fecha de Nacimiento</label>
        <input type="date" name="fecha_nacimiento" value={values.fecha_nacimiento} onChange={handleChange} />

        <label>Dirección</label>
        <input type="text" name="direccion" value={values.direccion} onChange={handleChange} />

        <label>Teléfono</label>
        <input type="text" name="telefono" value={values.telefono} onChange={handleChange} />

        <label>Correo Electrónico</label>
        <input type="email" name="correo_electronico" value={values.correo_electronico} onChange={handleChange} />

        <label>Nivel Académico</label>
        <input type="text" name="nivel_academico" value={values.nivel_academico} onChange={handleChange} />

        <label>ID del Curso*</label>
        <input type="number" name="id_curso" value={values.id_curso} onChange={handleChange} required />

        <button type="submit" className={"button"} disabled={isLoading}>
          {isLoading ? 'Creando...' : 'Crear Estudiante'}
        </button>
      </form>
    </div>
  );
};

export default CreateStudentForm;
