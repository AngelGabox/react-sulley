import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdatePersonMutation } from "../../../../features/people/personApi";
import "../../GeneralForm.css";

const UpdatePersonaForm = ({ person }) => {
  const [updatePerson, { isLoading }] = useUpdatePersonMutation();

  // Valores iniciales tomados de la persona recibida por props
  const initialValues = {
    nombre: person?.nombre || "",
    apellido: person?.apellido || "",
    telefono: person?.telefono || "",
    direccion: person?.direccion || "",
    fecha_nacimiento: person?.fecha_nacimiento || "",
    tipo_documento: person?.tipo_documento || "",
    numero_documento: person?.numero_documento || "",
    usuario: person?.usuario_id || "",
  };

  const required = "* Este campo es obligatorio";

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().strict().required(required),
    apellido: Yup.string().strict().required(required),
    telefono: Yup.string().required(required),
    direccion: Yup.string().required(required),
    fecha_nacimiento: Yup.date().required(required),
    tipo_documento: Yup.string()
      .max(20, "Máximo 20 caracteres")
      .required(required),
    numero_documento: Yup.string()
      .max(20, "Máximo 20 caracteres")
      .required(required),
    // usuario: Yup.number().required(required),
  });

  const onSubmit = async (values) => {
    try {
      await updatePerson({ id: person.id, ...values }).unwrap();
      alert("Persona actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar persona:", error);
      alert("Error al actualizar persona");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = formik;

  const fields = [
    { name: "nombre", type: "text", label: "Nombre" },
    { name: "apellido", type: "text", label: "Apellido" },
    { name: "telefono", type: "text", label: "Teléfono" },
    { name: "direccion", type: "text", label: "Dirección" },
    { name: "fecha_nacimiento", type: "date", label: "Fecha de Nacimiento" },
    { name: "tipo_documento", type: "text", label: "Tipo de Documento" },
    { name: "numero_documento", type: "text", label: "Número de Documento" },
    // { name: "usuario", type: "number", label: "Usuario (ID)" },
  ];

  return (
    <div className="create-form">
      <form className="form" onSubmit={handleSubmit}>
        <span className="form--title">Actualizar Persona</span>

        {fields.map(({ name, type, label }) => (
          <div key={name} className="container_box">
            <div className="container--input">
              <input
                type={type}
                name={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span>{label}*</span>
              <i></i>
            </div>
            {errors[name] && touched[name] && (
              <div className="error">{errors[name]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Actualizando..." : "Actualizar Persona"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePersonaForm;
