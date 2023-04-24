import React, {useRef, useState} from 'react'
import {useAuth} from './AuthContext'
import { useNavigate, Link } from 'react-router-dom'


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
        <div className='auth'>
            <h2 className='auth__title'>Log In</h2>
            {error && <p className='auth__error'>{error}</p>}   
            <form className='auth__form'>
                <input
                placeholder='E-mail'
                className='auth__input'
                type="email"
                ref={email}
                required />
                <input
                placeholder='Password'
                className='auth__input'
                type="password"
                ref={password}
                required />
                <button disabled={loading} className='auth__button' onClick={handleClick}>Log In</button>
            </form>
            <p className='auth__bottom'><span>If you don't have an account</span> <Link to={'/signup'}>sign up</Link></p>
        </div>
    )
}

