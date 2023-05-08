import React from 'react'
import './style/index.scss'
import Signup from './components/Signup'
import StartPage from './components/StartPage'
import Login from './components/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import DashboardMain from './components/DashboardMain'
import Profile from './components/Profile'
import Diet from './components/Diet'


function App() {
 return(

    <div className="content">
        <Routes>
          <Route exact path='/' element={<StartPage />}/>
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard' element={<Dashboard />}>
            <Route exact path='/dashboard' element={<DashboardMain />} />
            <Route exact path='/dashboard/profile' element={<Profile />} />
            <Route exact path='/dashboard/products' element={<h1>Products</h1>} />
            <Route exact path='/dashboard/diet' element={<Diet />} />
          </Route>
        </Routes>
    </div>
 )
  
}

export default App
