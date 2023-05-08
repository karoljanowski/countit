import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Meal from './Meal'
import {nanoid} from 'nanoid'
import AddProduct from './AddProduct'

export default function Diet() {
    const navigate = useNavigate()
    const [meals, setMeals] = useState([])
    const [addingProducts, setAddingProducts] = useState()

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

    function addProduct(){
        setAddingProducts(true)
    }
    const mealsDOM = meals.map(meal => {
        return <Meal key={meal.id} data={meal} name={meal.name} addProduct={addProduct} onChange={(newName) => handleItemChange(meal.id, newName)}/>
    })
    return (
        <div className="dashboard__main">
            <span className='dashboard__back'>
                <FontAwesomeIcon onClick={handleBack} icon={faArrowLeft}></FontAwesomeIcon>
            </span>
            <div className='dashboard__top'>
                <h2 className='dashboard__title'>Diet</h2>
                <button className='dashboard__add-meal' onClick={addMeal}>Add meal</button>
            </div>
            <h2 className='dashboard__subtitle'>Meals</h2>
            {mealsDOM}
            {addingProducts && <AddProduct />}
        </div>
    )
}
