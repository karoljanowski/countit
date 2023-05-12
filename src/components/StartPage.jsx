import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons'

export default function StartPage() {
    return (
        <div className='start-page'>
            {/* <Menu /> */}
            <h1 className='start-page__title'><span>Count</span><span>it!</span></h1>
            <p className='start-page__desc'>Easy calorie calculator to make eating easier</p>
            <span className='start-page__icon'>
                <FontAwesomeIcon icon={faCarrot}></FontAwesomeIcon>
            </span>
            <div className="start-page__buttons">
                <Link to={'/signup'} className='start-page__button'>Try for free</Link>
                <Link to={'/login'} className='start-page__button'>Log in</Link>
            </div>
        </div>

    )
}
