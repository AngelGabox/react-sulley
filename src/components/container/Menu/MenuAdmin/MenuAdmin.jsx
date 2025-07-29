// src/components/MenuAdmin.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuAdmin.css'; // Importa el CSS
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../features/user/userSlice'

const MenuAdmin = ({ setView, currentView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    // Eliminar datos del almacenamiento
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');

    // Limpiar el estado global (opcional)
    dispatch(setUser(null));

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
        <li onClick={logoutUser}>
          Cerrar Sesion
        </li>
      </ul>
    </aside>
  );
};


export default MenuAdmin;
