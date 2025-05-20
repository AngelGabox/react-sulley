import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TablaEstudiantes from './components/pure/TablaEstudiantes/TablaEstudiantes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TablaEstudiantes></TablaEstudiantes>
    </>
  )
}

export default App
