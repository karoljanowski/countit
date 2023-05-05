import React, { useEffect, useState } from 'react'
import { useAuth } from './Context'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Dashboard() {
   
    const {currentUser, getDatabase} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!currentUser){
            navigate('/login')
        }
    },[])
    
    if(currentUser){
        return (
            <div className='dashboard'>                
                <Outlet />
                
            </div>
        )
    }
}

