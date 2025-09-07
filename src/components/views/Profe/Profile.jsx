// src/components/views/Profe/Perfil.jsx
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateMyPersonaMutation } from '../../../features/people/personApi';
import { setPersona, setCredentials } from '../../../features/user/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './css/Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const persona = useSelector(s => s.user.persona);
  const user    = useSelector(s => s.user.user);

  const [editMode, setEditMode] = useState(false);
  const [updateMyPersona, { isLoading }] = useUpdateMyPersonaMutation();

  // Valores iniciales del form
  const initialValues = useMemo(() => ({
    nombre:            persona?.nombre || '',
    apellido:          persona?.apellido || '',
    telefono:          persona?.telefono || '',
    tipo_documento:    persona?.tipo_documento || '',
    numero_documento:  persona?.numero_documento || '',
    direccion:         persona?.direccion || '',
    fecha_nacimiento:  persona?.fecha_nacimiento || '',
    usuario_email:     user?.email || '',
    usuario_password:  '', // opcional, cambiar contraseña
  }), [persona, user]);

  const validationSchema = Yup.object({
    nombre:           Yup.string().required('Requerido'),
    apellido:         Yup.string().required('Requerido'),
    telefono:         Yup.string().required('Requerido'),
    tipo_documento:   Yup.string().required('Requerido'),
    numero_documento: Yup.string().required('Requerido'),
    direccion:        Yup.string().required('Requerido'),
    fecha_nacimiento: Yup.string().required('Requerido'),
    usuario_email:    Yup.string().email('Email inválido').required('Requerido'),
    usuario_password: Yup.string(), // opcional
  });

  const onSubmit = async (values) => {
    // Armamos el PATCH solo con campos que tocan Persona y Usuario
    const patch = {
      nombre:            values.nombre,
      apellido:          values.apellido,
      telefono:          values.telefono,
      tipo_documento:    values.tipo_documento,
      numero_documento:  values.numero_documento,
      direccion:         values.direccion,
      fecha_nacimiento:  values.fecha_nacimiento,
      usuario: {
        email:    values.usuario_email,
        username: values.usuario_email, // tu serializer lo iguala si no viene
      }
    };
    if (values.usuario_password?.trim()) {
      patch.usuario.password = values.usuario_password.trim();
    }

    try {
      const updated = await updateMyPersona(patch).unwrap();

      // Sincroniza Redux + sessionStorage (persona)
      dispatch(setPersona(updated));
      sessionStorage.setItem('persona', JSON.stringify(updated));

      // Si cambió el email, también actualiza el bloque user en Redux/storage
      if (values.usuario_email !== user?.email) {
        const newUser = { ...user, email: values.usuario_email, username: values.usuario_email };
        sessionStorage.setItem('user', JSON.stringify(newUser));
        // mantén los tokens actuales
        dispatch(setCredentials({ user: newUser, access: localStorage.getItem('access'), refresh: localStorage.getItem('refresh') }));
      }

      alert('Perfil actualizado');
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert('No se pudo actualizar el perfil');
    }
  };

  const formik = useFormik({ initialValues, validationSchema, enableReinitialize: true, onSubmit });

  if (!persona || !user) return <p>Cargando perfil…</p>;

  return (
    <div className="perfil-wrapper">
      <h2>Perfil</h2>

      {!editMode ? (
        <div className="perfil-read">
          <section>
            <h3>Datos personales</h3>
            <p><strong>Nombre: </strong>{persona.nombre} {persona.apellido}</p>
            <p><strong>Documento: </strong>{persona.tipo_documento} {persona.numero_documento}</p>
            <p><strong>Teléfono: </strong>{persona.telefono}</p>
            <p><strong>Dirección: </strong>{persona.direccion}</p>
            <p><strong>Nacimiento: </strong>{persona.fecha_nacimiento}</p>
          </section>
          <section>
            <h3>Usuario</h3>
            <p><strong>Email/Usuario: </strong>{user.email}</p>
            <p><strong>Rol: </strong>{user.rol}</p>
            <small className="hint">¿Cambiar contraseña? Edita y escribe una nueva.</small>
          </section>

          <div className="perfil-actions">
            <button onClick={() => setEditMode(true)}>Editar</button>
            <a className="link" href="/cambiar-contrasena">Cambiar contraseña</a>
          </div>
        </div>
      ) : (
        <form className="perfil-form" onSubmit={formik.handleSubmit}>
          <h3>Editar Perfil</h3>

          <div className="grid">
            <label>Nombre
              <input name="nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.nombre && formik.errors.nombre && <span className="error">{formik.errors.nombre}</span>}
            </label>

            <label>Apellido
              <input name="apellido" value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.apellido && formik.errors.apellido && <span className="error">{formik.errors.apellido}</span>}
            </label>

            <label>Tipo de documento
              <input name="tipo_documento" value={formik.values.tipo_documento} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.tipo_documento && formik.errors.tipo_documento && <span className="error">{formik.errors.tipo_documento}</span>}
            </label>

            <label>Número de documento
              <input name="numero_documento" value={formik.values.numero_documento} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.numero_documento && formik.errors.numero_documento && <span className="error">{formik.errors.numero_documento}</span>}
            </label>

            <label>Teléfono
              <input name="telefono" value={formik.values.telefono} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.telefono && formik.errors.telefono && <span className="error">{formik.errors.telefono}</span>}
            </label>

            <label>Dirección
              <input name="direccion" value={formik.values.direccion} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.direccion && formik.errors.direccion && <span className="error">{formik.errors.direccion}</span>}
            </label>

            <label>Fecha de nacimiento
              <input type="date" name="fecha_nacimiento" value={formik.values.fecha_nacimiento} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.fecha_nacimiento && formik.errors.fecha_nacimiento && <span className="error">{formik.errors.fecha_nacimiento}</span>}
            </label>

              {/* (también será tu usuario) */}
            <label>Email 
              <input type="email" name="usuario_email" value={formik.values.usuario_email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.usuario_email && formik.errors.usuario_email && <span className="error">{formik.errors.usuario_email}</span>}
            </label>

            {/* <label>Nueva contraseña (opcional)
              <input type="password" name="usuario_password" value={formik.values.usuario_password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Déjala vacía para no cambiarla"/>
              {formik.touched.usuario_password && formik.errors.usuario_password && <span className="error">{formik.errors.usuario_password}</span>}
            </label> */}
          </div>

          <div className="perfil-actions">
            <button type="button" className="secondary" onClick={() => setEditMode(false)} disabled={isLoading}>Cancelar</button>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Guardando…' : 'Guardar cambios'}</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;

