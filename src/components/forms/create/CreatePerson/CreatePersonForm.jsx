// src/components/forms/create/CreatePerson/CreatePersonForm.jsx
import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreatePersonMutation } from '../../../../features/people/personApi';
import '../../GeneralForm.css';

const CreatePersonForm = () => {
  const [createPerson, { isLoading }] = useCreatePersonMutation();

  const initialValues = {
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    usuario_id: ''
  };

  const required = "* Este campo es obligatorio";

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required(required),
    apellido: Yup.string()
      .required(required),
    telefono: Yup.string()
      .required(required),
    direccion: Yup.string()
      .required(required),
    fecha_nacimiento: Yup.date()
      .required(required),
    usuario_id: Yup.number()
      .integer("Debe ser un número entero")
      .required(required)
  });

  const onSubmit = async (values) => {
    try {
      await createPerson(values).unwrap();
      alert('Persona creada con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al crear persona');
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

  const campos = [
    { name: "nombre", type: "text", label: "Nombre*" },
    { name: "apellido", type: "text", label: "Apellido*" },
    { name: "telefono", type: "text", label: "Teléfono*" },
    { name: "direccion", type: "text", label: "Dirección*" },
    { name: "fecha_nacimiento", type: "date", label: "Fecha de Nacimiento*" },
    { name: "usuario_id", type: "number", label: "ID de Usuario*" }
  ];

  return (
    <div className="create-form">
      <form className="form" onSubmit={handleSubmit}>
        <span className="form--title">Crear Persona</span>

        {campos.map(({ name, type, label }) => (
          <div className="container_box" key={name}>
            <div
              className={
                values[name] || name === "fecha_nacimiento"
                  ? "container--input focused"
                  : "container--input"
              }
            >
              <input
                type={type}
                name={name}
                id={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span>{label}</span>
              <i></i>
            </div>
            {errors[name] && touched[name] && (
              <div className="error">{errors[name]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear Persona"}
        </button>
      </form>
    </div>
  );
};

export default CreatePersonForm;
