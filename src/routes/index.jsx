import React from 'react'
import { Route, Routes} from 'react-router-dom'
import TablaEstudiantes from '../components/container/TablaEstudiantes/TablaEstudiantes'
import Admin from '../components/views/Admin/Admin'
import MenuAdmin from '../components/container/Menu/MenuAdmin'
import Login from '../components/views/Login/Login'
import RequireAuth from '../hooks/RequireAutn'
const index = () => {
  return (
    <>
      <Routes>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/estudiantes' element={<TablaEstudiantes/>} />
            <Route path='/admin' element={
              <RequireAuth>
                <Admin/>
              </RequireAuth>
          
          } />
      </Routes>
    </>  
  )
}

export default index