import React from 'react'
import "./MenuProfe.css"
const MenuProfe = () => {
  return (
    <aside class="sidebar">
      <div class="role">
        <div class="icon"></div>
        <h2>Profesor</h2>
      </div>
      <nav>
        <ul>
          <li class="active"><a href="#cursos">📚 Ver cursos asignados</a></li>
          <li><a href="#estudiantes">👥 Ver lista de estudiantes</a></li>
          <li><a href="#asistencia-clases">📈 Asistencia y clases</a></li>
          <li><a href="#actividades">📚 Actividades por curso</a></li>
        </ul>
      </nav>
      <button class="logout">Cerrar sesión</button>
    </aside>
  )
}

export default MenuProfe