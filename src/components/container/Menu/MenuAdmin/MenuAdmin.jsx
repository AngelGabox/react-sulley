// src/components/MenuAdmin.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuAdmin.css'; // Importa el CSS
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../features/user/userSlice'

const MenuAdmin = ({ setView, currentView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    // Limpiar las credenciales
    dispatch(logoutUser());

    // Redirigir al login
    navigate('/login', { replace: true });
  };

  return (
    <aside className="admin-menu">
      <h3>Menú</h3>
      <ul>
        <li onClick={() => setView('estudiantes')} className={currentView === 'estudiantes' ? 'active' : ''}>
          Estudiantes
        </li>
        <li onClick={() => setView('personas')} className={currentView === 'personas' ? 'active' : ''}>
          Personas
        </li>
        <li onClick={() => setView('materias')} className={currentView === 'materias' ? 'active' : ''}>
          Materias
        </li>
        <li onClick={() => setView('asignaciones')} className={currentView === 'asignaciones' ? 'active' : ''}>
          Asignaciones
        </li>
        <li onClick={logout}>
          Cerrar Sesion
        </li>
      </ul>
    </aside>
  );
};


export default MenuAdmin;
