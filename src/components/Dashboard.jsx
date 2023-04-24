import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate, Outlet } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    async function handleLogout(){
        setError('')
        try{
            await logout()
            navigate('/')
        }catch{
            setError('Failed to log out')
        }
    }

    useEffect(()=>{
        if(!currentUser){
            navigate('/login')
        }
    },[])
    
    if(currentUser){
        return (
            <div className='dashboard'>
                <div className='dashboard__top'>
                    <p className='dashboard__user'><FontAwesomeIcon icon={faUser} />{currentUser.email}</p>
                    <button className='dashboard__logout' onClick={handleLogout}>Log Out</button>
                </div>
                <h2 className='dashboard__title'>Dashboard</h2>
                <Outlet />
            </div>
        )
    }
}

