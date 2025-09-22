// src/components/views/Acudiente/Acudiente.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../features/user/userSlice';
import './css/Acudiente.css';

import InfoEstudiante from './InfoEstudiante';
import EventosAcudiente from './EventosAcudiente';
import PerfilAcudiente from './PerfilAcudiente';
import BoletinAcudiente from './BoletinAcudiente';   // <— nuevo

const Acudiente = () => {
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const persona   = useSelector((s) => s.user.persona) || {};
  const nombreAcudiente = `${persona?.nombre ?? ''} ${persona?.apellido ?? ''}`.trim();

  const [view, setView] = useState('info');

  const renderContent = () => {
    switch (view) {
      case 'info':      return <InfoEstudiante />;
      case 'eventos':   return <EventosAcudiente />;
      case 'perfil':    return <PerfilAcudiente />;
      case 'boletines': return <BoletinAcudiente />;   // <— nuevo
      default:          return null;
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  return (
    <div className="acu-layout">
      <aside className="acu-sidebar">
        <div className="acu-user">
          <div className="acu-avatar">
            <img src={persona.foto_url || '/Imagen/user-placeholder.png'} alt="Acudiente" />
          </div>
          <div className="acu-username">Acudiente: {nombreAcudiente || '—'}</div>
        </div>

        <nav className="acu-menu">
          <button type="button" className={`acu-item ${view==='info'?'active':''}`} onClick={() => setView('info')}>
            <span className="acu-dot" /> Info estudiante
          </button>
          <button type="button" className={`acu-item ${view==='boletines'?'active':''}`} onClick={() => setView('boletines')}>
            <span className="acu-dot" /> Boletines
          </button>
          <button type="button" className={`acu-item ${view==='eventos'?'active':''}`} onClick={() => setView('eventos')}>
            <span className="acu-dot" /> Eventos
          </button>
          <button type="button" className={`acu-item ${view==='perfil'?'active':''}`} onClick={() => setView('perfil')}>
            <span className="acu-dot" /> Perfil
          </button>
          <button className="acu-item logout" onClick={logout}>
            <span className="acu-dot" /> Cerrar sesión
          </button>
        </nav>
      </aside>

      <main className="acu-main">
        <header className="acu-breadcrumb">
          <span>Acudiente</span>
          <span className="sep">›</span>
          <span>
            {view === 'info' ? 'Información del estudiante'
              : view === 'boletines' ? 'Boletines'
              : view === 'eventos' ? 'Eventos'
              : 'Perfil'}
          </span>
        </header>
        <div className="acu-panel">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Acudiente;
