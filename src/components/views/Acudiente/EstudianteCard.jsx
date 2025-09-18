// src/components/views/Acudiente/EstudianteCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const EstudianteCard = ({ estudiante }) => {
    const navigate = useNavigate();
  // Estructura sugerida del backend:
  // {
  //   id, nombre, apellido, tipo_documento, numero_documento,
  //   edad?: number, telefono, direccion, correo_electronico,
  //   curso: { id, nombre_curso },
  //   foto_url?: string,
  //   acudiente_nombre?: string
  // }
  const {
    nombre,
    apellido,
    tipo_documento,
    numero_documento,
    telefono,
    direccion,
    correo_electronico,
    curso,
    foto_url,
    acudiente_nombre,
    edad,
  } = estudiante || {};

  return (
    <div className="acu-card est-card">
      <div className="est-left">
        <div className="est-avatar">
          <img src={foto_url || '/Imagen/user-placeholder.png'} alt={`${nombre} ${apellido}`} />
        </div>
        <div>
          <h3 className="est-nombre">{`${nombre ?? ''} ${apellido ?? ''}`.trim()}</h3>
          <span className="est-curso">Curso: {curso?.nombre_curso ?? curso ?? '—'}</span>
        </div>
      </div>

      <div className="est-info">
        <div><strong>Documento:</strong> {tipo_documento ?? '—'} {numero_documento ?? ''}</div>
        <div><strong>Edad:</strong> {edad ?? '—'}</div>
        <div><strong>Dirección:</strong> {direccion ?? '—'}</div>
        <div><strong>Acudiente:</strong> {acudiente_nombre ?? '—'}</div>
        <div><strong>Teléfono:</strong> {telefono ?? '—'}</div>
        <div><strong>Correo:</strong> {correo_electronico ?? '—'}</div>
      </div>

      <aside className="est-actions">
        <h4>Editar Perfil Estudiante</h4>
        <button
          type="button"
          className="btn-primary"
          onClick={() => alert('Abrir modal/forma de edición del estudiante')}
        >
          Editar Perfil
        </button>
        <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(`/acudiente/estudiante/${estudiante.id}`, {
                state: { estudiante } // opcional para no volver a pedir nombre
            })}
            style={{ marginTop: 8 }}
            >
            Ver actividades
        </button>
      </aside>
    </div>
  );
};

export default EstudianteCard;
