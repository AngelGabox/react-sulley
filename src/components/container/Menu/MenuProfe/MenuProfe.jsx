import React from 'react'
import "./MenuProfe.css"
import { useSelector } from 'react-redux'

const MenuProfe = ({setView}) => {
  const claseActiva = useSelector(s => s.clase?.current?.status === 'running');
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
      <div className="navigation">

        <ul className='menu-profe'>
            
            <li onClick={()=>setView("inicio")}>
              <span className="icon"><ion-icon name="grid-outline"></ion-icon></span>  
              <span className="text">Inicio</span>
            </li>
            
            <li onClick={() => {
                                if (claseActiva) return; 
                                setView("cursos");
                              }} className={claseActiva ? 'disabled' : ''} >
              <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
              <span className="text">Cursos</span>
            </li>
            
            <li onClick={()=>setView("asistencia")}>
              <span className='icon'><ion-icon name="hand-left-outline"></ion-icon></span>
              <span className="text">Asistencia</span>
            </li>
            
            <li onClick={()=>setView("actividades")}>
              <span className="icon"><ion-icon name="book-outline"></ion-icon></span>
              <span className="text">Actividades</span>
            </li>

            <li onClick={showUserProfile}>
            {/* <li onClick={()=>setView("perfil")}>Perfil</li> */}
              <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
              <span className="text">Perfil</span>
            </li>
        </ul>
      </div>
    </aside>
  )
}

export default MenuProfe