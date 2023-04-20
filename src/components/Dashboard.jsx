import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

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
    console.log(currentUser.uid)
    if(currentUser){
        return (
            <div>
                <p>Dashboard</p>
                {currentUser.uid}
                <button onClick={handleLogout}>Log Out</button>
            </div>
        )
    }
}
