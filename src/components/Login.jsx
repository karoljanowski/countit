import React, {useRef, useState} from 'react'
import {useAuth} from './AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    const email = useRef()
    const password = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleClick(e){
        e.preventDefault()
        
        try{
            await login(email.current.value, password.current.value)
            navigate('/dashboard')
        }catch{
            setError('Failed to log in')
        }
        setLoading(false)
    }
    return (
        <div className='signup'>
            <h2 className='signup__title'>Log In</h2>
            {error && <p className='signup__error'>{error}</p>}
            <form className='signup__form'>
                <input
                placeholder='E-mail'
                className='signup__input'
                type="email"
                ref={email}
                required />
                <input
                placeholder='Password'
                className='signup__input'
                type="password"
                ref={password}
                required />
                <button disabled={loading} className='signup__button' onClick={handleClick}>Log In</button>
            </form>
        </div>
    )
}

