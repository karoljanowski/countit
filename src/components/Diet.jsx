import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Meal from './Meal'
import {nanoid} from 'nanoid'

export default function Diet() {
    const navigate = useNavigate()
    const [meals, setMeals] = useState([])
    function handleBack(){
        navigate('/dashboard')
    }
    function addMeal(){
        const newMeal = {
            id: nanoid(),
            name: 'Meal',
            total: {
                calorie: 0,
                protein: 0,
                fat: 0,
                carbo: 0
            },
            ingrediens: []
        }
        setMeals([...meals, newMeal])
    }
    const handleItemChange = (id, newName) => {
        setMeals((prev) =>
          prev.map((meal) => (meal.id === id ? { ...meal, name: newName } : meal))
        );
      };
    const mealsDOM = meals.map(meal => {
        return <Meal key={meal.id} data={meal} name={meal.name} onChange={(newName) => handleItemChange(meal.id, newName)}/>
    })
    console.log(meals)
    return (
        <div className="dashboard__main">
            <FontAwesomeIcon style={{color: "#263A29",}} size='xl' onClick={handleBack} icon={faArrowLeft}></FontAwesomeIcon>
            <div className='dashboard__top'>
                <div className='dashboard__title'>Diet</div>
                <button className='dashboard__add-meal' onClick={addMeal}>Add meal</button>
            </div>
            <h2 className='dashboard__subtitle'>Meals</h2>
            {mealsDOM}
        </div>
    )
}
