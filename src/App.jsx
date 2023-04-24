import React from 'react'
import './style/index.scss'
import Signup from './components/Signup'
import StartPage from './components/StartPage'
import Login from './components/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'


function App() {
 return(

    <div className="content">
        <Routes>
          <Route exact path='/' element={<StartPage/ >}/>
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard' element={<Dashboard />}>
            <Route exact path='/dashboard' element={<Link to='/dashboard/profile'>123</Link>} />
            <Route exact path='/dashboard/profile' element={<h1>Profile</h1>} />
          </Route>
        </Routes>
    </div>
 )
  
}

export default App
