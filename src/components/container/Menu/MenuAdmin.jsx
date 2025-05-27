// src/components/MenuAdmin.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuAdmin.css'; // Importa el CSS

const MenuAdmin = ({setterView, view}) => {

  const handleViewChange = (newView) => {
    setterView(newView);
  }
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Menú Principal</h3>
      <nav className="nav-menu">
        <NavLink to="/admin" className="nav-link">
          <i className="fas fa-home" onClick={()=>handleViewChange("home")}></i> Inicio
        </NavLink>
        <NavLink to="/admin/estudiantes" className="nav-link">
          <i className="fas fa-users" onClick={()=>handleViewChange("estudiantes")}></i> Estudiantes
        </NavLink>
        <NavLink to="/admin/actividades" onClick={()=>handleViewChange("actividades")} className="nav-link">
          <i className="fas fa-calendar-alt"></i> Actividades
        </NavLink>
        <NavLink to="/admin/acudientes" className="nav-link">
          <i className="fas fa-user" onClick={()=>handleViewChange("personas")} ></i> Acudientes y Profesores
        </NavLink>
        <NavLink to="/login" className="nav-link">
          <i className="fas fa-sign-out-alt"></i> Cerrar sesión
        </NavLink>
      </nav>
    </aside>
  );
};

export default MenuAdmin;
