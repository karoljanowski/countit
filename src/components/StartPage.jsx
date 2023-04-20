import React from 'react'
import { Link } from 'react-router-dom'

export default function StartPage() {
    return (
        <div>
            <div>StartPage</div>
            <Link to={'/signup'}>Signup</Link>
            <Link to={'/login'}>Login</Link>
        </div>

    )
}
