import React from 'react';
import './Menu.css'; // Assuming you have some styles for the Menu component


const Menu = () => (
  <div >
    <h3 className="mb-4">Menú Principal</h3>
    <menu className="menu-principal">
      <a href="index.html"><i className="fas fa-home"></i> Inicio</a>
      <a href="Estudiantes.html"><i className="fas fa-users"></i> Estudiantes</a>
      <a href="Asistencia.html"><i className="fas fa-chalkboard-teacher"></i> Asistencia</a>
      <a href="Acudientes.html"><i className="fas fa-user"></i> Acudientes</a>
      <a href="Login.html"><i className="fas fa-sign-out-alt"></i> Cerrar sesión</a>
    </menu>
  </div>
);

export default Menu;