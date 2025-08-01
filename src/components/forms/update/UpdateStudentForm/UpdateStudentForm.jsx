import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateStudentMutation } from '../../../../features/students/studentApi'; 
import '../../GeneralForm.css';

const UpdateStudentForm = ({ student, onClose }) => {
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();

  // Valores iniciales tomados del estudiante recibido por props
  const initialValues = {
    nombre: student?.nombre || '',
    apellido: student?.apellido || '',
    fecha_nacimiento: student?.fecha_nacimiento || '',
    direccion: student?.direccion || '',
    telefono: student?.telefono || '',
    correo_electronico: student?.correo_electronico || '',
    nivel_academico: student?.nivel_academico || '',
    curso: student?.curso|| ''
  };

  const required = "* Este campo es obligatorio";

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().strict().required(required),
    apellido: Yup.string().required(required),
    fecha_nacimiento: Yup.string().required(required),
    direccion: Yup.string().required(required),
    telefono: Yup.string().required(required),
    correo_electronico: Yup.string().email('Email inválido').required(required),
    nivel_academico: Yup.string().required(required),
    curso: Yup.number().required(required),
  });

  const onSubmit = (values) => {
    try {
      updateStudent({ id: student.id, ...values }).unwrap();
      alert("Estudiante actualizado con éxito");
      onClose()
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      alert("Error al actualizar estudiante");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = formik;

  return (
    <div className="create-form">
      <form className="form" onSubmit={handleSubmit}>
        <span className="form--title">Actualizar Estudiante</span>

        {["nombre", "apellido", "fecha_nacimiento", "direccion", "telefono", "correo_electronico", "nivel_academico", "curso"].map((field, idx) => (
          <div key={idx} className="container_box">
            <div className="container--input">
              <input
                type={field === "fecha_nacimiento" ? "date" : field === "correo_electronico" ? "email" : field === "curso" ? "number" : "text"}
                name={field}
                value={values[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span>{field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}*</span>
              <i></i>
            </div>
            {errors[field] && touched[field] && <div className="error">{errors[field]}</div>}
          </div>
        ))}

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Actualizando...' : 'Actualizar Estudiante'}
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentForm;
