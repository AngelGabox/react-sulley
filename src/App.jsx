import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Routes from './routes/index.jsx'


function App() {

  return (
    <BrowserRouter> 
      <Routes></Routes>
    </BrowserRouter>
  )
}

export default App
