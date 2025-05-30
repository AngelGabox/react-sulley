// src/components/MenuAdmin.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuAdmin.css'; // Importa el CSS

const MenuAdmin = ({ setView, currentView }) => {
  return (
    <aside className="admin-menu">
      <h3>Menú</h3>
      <ul>
        <li onClick={() => setView('estudiantes')} className={currentView === 'estudiantes' ? 'active' : ''}>
          Estudiantes
        </li>
        <li onClick={() => setView('profesores')} className={currentView === 'profesores' ? 'active' : ''}>
          Profesores
        </li>
        <li onClick={() => setView('cursos')} className={currentView === 'cursos' ? 'active' : ''}>
          Cursos
        </li>
      </ul>
    </aside>
  );
};


export default MenuAdmin;
