import './App.css'
import Home from './assets/Pages/Home'
import { Route,Routes } from 'react-router-dom'
import Login from './assets/Pages/Login.jsx'
import Create from './assets/Pages/Create.jsx'
import Nav from './assets/Components/Nav.jsx'
import Postpage from './assets/Pages/Postpage.jsx'
 import { ToastContainer } from 'react-toastify';
function App() {


  return (
    <div>
      <ToastContainer/>
      <Routes>

        <Route element={<Nav/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/post/:id' element={<Postpage/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
