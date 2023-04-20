import React from 'react'
import './style/index.scss'
import Signup from './components/Signup'
import StartPage from './components/StartPage'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'


function App() {
 return(

    <div className="content">
      <div>
        <Routes>
          <Route exact path='/' element={<StartPage/ >}/>
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
 )
  
}

export default App
