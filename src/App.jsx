import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import TablaEstudiantes from './components/container/TablaEstudiantes/TablaEstudiantes.jsx'
import Admin from './components/views/Admin/Admin'
import Routes from './routes/index.jsx'


function App() {

  return (
    <BrowserRouter> 
      <Routes></Routes>
    </BrowserRouter>
  )
}

export default App
