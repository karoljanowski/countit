import React, {useRef, useState} from 'react'
import {useAuth} from './AuthContext'
import { useNavigate } from 'react-router-dom'


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
        <div className='signup'>
            <h2 className='signup__title'>Sign Up</h2>
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
                <input
                placeholder='Password Confirmation'
                className='signup__input'
                type="password"
                ref={confirmPassword}
                required />
                <button disabled={loading} className='signup__button' onClick={handleClick}>Sign Up</button>

            </form>
        </div>
    )
}

