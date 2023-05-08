import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import food from '../assets/food.svg'

export default function StartPage() {
    return (
        <div className='start-page'>
            <Menu />
            <h1 className='start-page__title'><span>Count</span><span>it!</span></h1>
            <p className='start-page__desc'>Easy calorie calculator to make eating easier</p>
            <img className='start-page__img' src={food}/>
            <Link to={'/signup'} className='start-page__button'>Try for free</Link>
        </div>

    )
}
