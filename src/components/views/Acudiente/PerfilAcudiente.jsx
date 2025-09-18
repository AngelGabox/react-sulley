// src/components/views/Acudiente/Perfil.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const PerfilAcudiente = () => {
  const persona = useSelector((s) => s.user.persona) || {};
  const nombre = `${persona?.nombre ?? ''} ${persona?.apellido ?? ''}`.trim();

  return (
    <section className="acu-card">
      <h2 className="acu-title">Perfil del acudiente</h2>
      <div className="perfil-wrap">
        <div className="perfil-avatar">
          <img src="/Imagen/user-placeholder.png" alt="Foto" />
        </div>
        <div className="perfil-datos">
          <p><strong>Nombre:</strong> {nombre || '—'}</p>
          <p><strong>Correo:</strong> {persona?.email ?? '—'}</p>
          <p><strong>Teléfono:</strong> {persona?.telefono ?? '—'}</p>
          <p><strong>Dirección:</strong> {persona?.direccion ?? '—'}</p>
        </div>
      </div>
    </section>
  );
};

export default PerfilAcudiente;
