import React from 'react'
import "./MenuProfe.css"
import { useSelector } from 'react-redux'
const MenuProfe = ({setView, currentView}) => {
  const usuario = useSelector(state => state.user.user);
  
  const showUserProfile = () => {
    setView("perfil");
    console.log("Usuario actual:", usuario);
  }
  return (
    <aside className="sidebar">
      <div className="profile">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Foto de perfil" className="profile-img"/>
          <span>Profe Juan</span>
      </div>
      <nav>
          <ul>
              <li onClick={()=>setView("inicio")}>Inicio</li>
              <li onClick={()=>setView("cursos")}>Mis Cursos</li>
              <li onClick={()=>setView("asistencia")}>Asistencia</li>
              <li onClick={()=>setView("actividades")}>Actividades</li>
              {/* <li onClick={()=>setView("perfil")}>Perfil</li> */}
              <li onClick={showUserProfile}>Perfil</li>
          </ul>
      </nav>
    </aside>
  )
}

export default MenuProfe