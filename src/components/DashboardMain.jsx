import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './Context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function DashboardMain() {
  const navigate = useNavigate()
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState("")


  async function handleLogout(){
    setError('')
    try{
        await logout()
        navigate('/')
    }catch{
        setError('Failed to log out')
    }
}

  return (
    <div className='dashboard__main'>
      <div className='dashboard__top'>
        <p className='dashboard__user'><FontAwesomeIcon icon={faUser} />{currentUser.email}</p>
        <button className='dashboard__logout' onClick={handleLogout}>Log Out</button>
      </div>
      <h2 className='dashboard__title'>Dashboard</h2>
      <div className="dashboard__links">
        <Link className='dashboard__link' to={'/dashboard/profile'}>Profile</Link>
        <Link className='dashboard__link' to={'/dashboard/diet'}>Diet</Link>
      </div>
    </div>
  )
}
