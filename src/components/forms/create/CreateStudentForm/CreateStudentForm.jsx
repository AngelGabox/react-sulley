  // import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateStudentMutation } from '../../../../features/students/studentApi'; 
import  '../../GeneralForm.css';

const CreateStudentForm = ({onClose}) => {
  const [createStudent, { isLoading, }] = useCreateStudentMutation();

  const initialValues = {
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    nivel_academico: '',
    curso_id: ''
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

  const onSubmit = async() => {
    const { nombre, apellido, fecha_nacimiento, direccion, telefono, correo_electronico, nivel_academico, curso_id } = values ;
    
    if (nombre && apellido && fecha_nacimiento && direccion && telefono && correo_electronico && nivel_academico &&  curso_id ) {
      try {
        await createStudent({...values, curso: curso_id}).unwrap();
        alert('Estudiante creado con éxito');
        onClose()
      } catch (error) {
        alert('Error al crear estudiante');
        console.error(error);
      }
    } else {
      alert('Hay datos incorrectos');
    }
    onClose(false)
  };

	const formik = useFormik({ initialValues, validationSchema: validationSchema(), onSubmit });
  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = formik;
  

  const campos = [
    { name: "nombre", type: "text", label: "Nombre*" },
    { name: "apellido", type: "text", label: "Apellido*" },
    { name: "fecha_nacimiento", type: "date", label: "Fecha de Nacimiento*" },
    { name: "direccion", type: "text", label: "Dirección*" },
    { name: "telefono", type: "text", label: "Teléfono*" },
    { name: "correo_electronico", type: "email", label: "Correo Electrónico*" },
    { name: "nivel_academico", type: "text", label: "Nivel Académico*" },
    { name: "curso_id", type: "number", label: "ID del Curso*" }
  ];

  return (
    <div className="create-form">
      <form className="form" onSubmit={handleSubmit}>
        <span className="form--title">Crear Estudiante</span>

        {campos.map(({ name, type, label }) => (
          <div className="container_box" key={name}>

            {/* fix para el comportamieto del input de Correo y Fecha Nacimiento */}
            <div className={values[name] && name=="correo_electronico"? 
                "container--input focused":
                name=="fecha_nacimiento"?
                "container--input focused"
                : "container--input"}>

              <input
                type={type}
                name={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span>{label}</span>
              <i></i>
            </div>
            {errors[name] && touched[name] && <div className="error">{errors[name]}</div>}
          </div>
        ))}

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear Estudiante"}
        </button>
      </form>
    </div>
  );
};

export default CreateStudentForm;
