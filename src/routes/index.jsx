import React from 'react'
import { Route, Routes} from 'react-router-dom'
import TablaEstudiantes from '../components/pure/TablaEstudiantes/TablaEstudiantes'
import Admin from '../components/views/Admin/Admin'
import MenuAdmin from '../components/container/Menu/MenuAdmin'

const index = () => {
  return (
    <div className="app">
      
      <Routes>
          <Route path='/estudiantes' element={<TablaEstudiantes/>} />
          <Route exact path='/admin' element={<Admin/>} />
      </Routes>
    </div>  
  )
}

export default index