import React from 'react'
import { Route, Routes} from 'react-router-dom'
import TablaEstudiantes from '../components/container/TablaEstudiantes/TablaEstudiantes'
import Admin from '../components/views/Admin/Admin'
import MenuAdmin from '../components/container/Menu/MenuAdmin'
import Login from '../components/views/Login/Login'
import RequireAuth from '../hooks/RequireAutn'
import ProfesorCrearClase from '../components/forms/create/ProfesorCrearClase/ProfesorCrearClase'
import Home from "../components/views/Home/Home"

const index = () => {
  return (
    <>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/estudiantes' element={<TablaEstudiantes/>} />
            <Route path='/admin' element={
              // <RequireAuth>
              // </RequireAuth>
                <Admin/>
          } />
          {/* <Route
            path="/acudiente/*" element={
              <RequireAuth>
                <AcudienteDashboard />
              </RequireAuth>
            }
          /> */}
            <Route path='/profe' element={<ProfesorCrearClase/>}/>
      </Routes>
    </>  
  )
}

export default index