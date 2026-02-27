import './index.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Planner from './pages/Planner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/planner' element={<Planner />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App