import React from 'react'
import "./MenuProfe.css"
const MenuProfe = () => {
  return (
    <aside class="sidebar">
      <div class="profile">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Foto de perfil" class="profile-img"/>
          <span>Profe Juan</span>
      </div>
      <nav>
          <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="cursos.html">Mis Cursos</a></li>
              <li><a href="asistencia.html">Asistencia</a></li>
              <li><a href="actividades.html">Actividades</a></li>
              <li><a href="perfil.html">Perfil</a></li>
          </ul>
      </nav>
    </aside>
  )
}

export default MenuProfe