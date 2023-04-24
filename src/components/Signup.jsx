import React, {useRef, useState} from 'react'
import {useAuth} from './AuthContext'
import { useNavigate, Link } from 'react-router-dom'


export default function Signup() {
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleClick(e){
        e.preventDefault()
        if(password.current.value !== confirmPassword.current.value){
            setError('')
            setLoading(true)
            return setError('Password do not match')
        }
        try{
            await signup(email.current.value, password.current.value)
            navigate('login')
        }catch{
            setError('Failed to create an account')
        }
        setLoading(false)
    }
    return (
        <div className='auth'>
            <h2 className='auth__title'>Sign Up</h2>
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
                <input
                placeholder='Password Confirmation'
                className='auth__input'
                type="password"
                ref={confirmPassword}
                required />
                <button disabled={loading} className='auth__button' onClick={handleClick}>Sign Up</button>
            </form>
            <p className='auth__bottom'><span>If you already have an account</span> <Link to={'/login'}>login</Link></p>
        </div>
    )
}

