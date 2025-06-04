import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateStudentMutation } from '../../../features/students/studentApi'; 
import  '../CreatePerson.css';

const CreateStudentForm = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const initialValues = {
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    nivel_academico: '',
    id_curso: ''
  }
  
  const required = "* Este campo es obligatorio";
  
  	const validationSchema = () =>
		Yup.object().shape({
				nombre: Yup.string("only letter")
				.strict()
				.required(required),
				apellido: Yup.string()
					.required(required),
				fecha_nacimiento: Yup.string()
					.required(required),
				direccion: Yup.string()
					.required(required),
        telefono: Yup.number()
          .required(required),
        correo_electronico: Yup.string()
					.email('email invalido!') 
					.required(required),
				nivel_academico: Yup.string()
          .required(required)});


  // const handleChange = ({ target: { name, value } }) => {
  //   setValues({
  //     ...values,
  //     [name]: value
  //   });
  // };

  const onSubmit = (e) => {
    const { nombre, apellido, fecha_nacimiento, direccion, telefono, correo_electronico, nivel_academico,id_curso } = values;
  
    if (nombre && apellido && fecha_nacimiento && direccion && telefono && correo_electronico && nivel_academico && id_curso ) {
      try {
        createStudent(values).unwrap();
        alert('Estudiante creado con éxito');
      } catch (error) {
        alert('Error al crear estudiante');
        console.error(error);
      }
    } else {
      alert('Hay datos incorrectos');
    }
  };
	const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = formik;
  
  return (
    <div className={"create-form"}>
      <form className={"form"} onSubmit={handleSubmit}>
        <span className='form--title'>Crear Estudiante</span>
        
        <div className="container_box">
          <div className="container--input">
            <input 
              type="text" 
              name="nombre"
              value={values.nombre} 
              onChange={handleChange} 
              required={values.nombre?"":"required"} />
            <span>Nombre*</span>
            <i></i>
          </div>
        </div>

        <div className="container_box">
          <div className="container--input">
            <input 
              type="text" 
              name="apellido" 
              value={values.apellido} 
              onChange={handleChange} 
              required={values.apellido?"":"required"} />
            <span>Apellido*</span>
            <i></i>
          </div>
        </div>

        <div className="container_box">
          <div className="container--input">
            <input 
              type="date" 
              name="fecha_nacimiento"
              value={values.fecha_nacimiento} 
              onChange={handleChange} />
            <span>Fecha de Nacimiento*</span>
            <i></i>
          </div>
        </div>

        <div className="container_box">
          <div className="container--input">
            <input 
              type="text" 
              name="direccion" 
              value={values.direccion} 
              onChange={handleChange} 
              // required={values.direccion?"":"required"}
               required/>
            <span>Dirección</span>
            <i></i>
          </div>
        </div>

        <div className="container_box">
          <div className="container--input">
            <input 
              type="text" 
              name="telefono" 
              value={values.telefono} 
              onChange={handleChange} 
              required={values.telefono?"":"required"}
              />
            <span>Teléfono</span>
            <i></i>
          </div>
        </div>

        <div className="container_box">
          <div className="container--input">
            <input
              type="email" 
              name="correo_electronico" 
              value={values.correo_electronico} 
              onChange={handleChange} 
              required/>
            <span>Correo Electrónico</span>
            <i></i>
          </div>
        </div>

        <div className="container_box">
          <div className="container--input">
            <input 
              type="text" 
              name="nivel_academico" 
              value={values.nivel_academico} 
              onChange={handleChange} 
              required
            />
            <span>Nivel Académico*</span>
            <i></i>
          </div>
        </div>

        <div className="container_box">
          <div className="container--input">
            <input type="number" name="id_curso" value={values.id_curso} onChange={handleChange} required />
            <span>ID del Curso*</span>
            <i></i>
          </div>
        </div>

        <button type="submit" className={"button"} disabled={isLoading}>
          {isLoading ? 'Creando...' : 'Crear Estudiante'}
        </button>
      </form>
    </div>
  );
};

export default CreateStudentForm;
