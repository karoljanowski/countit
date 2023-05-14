import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Meal from './Meal'
import {nanoid} from 'nanoid'
import AddProduct from './AddProduct'
import { useAuth } from './Context'
import { updateUserMeals } from '../crud'
import Total from './Total'
import Loading from './Loading'

export default function Diet() {
    const navigate = useNavigate()
    const [meals, setMeals] = useState([])
    const [addingProducts, setAddingProducts] = useState(false)
    const [currentMeal, setCurrentMeal] = useState('')
    const {userData, setWantFetchData, currentUser} = useAuth()
    const [date, setDate] = useState(new Date())
    const [todayMeals, setTodayMeals] = useState([])


    function handleBack(){
        navigate('/dashboard')
    }
    
    function addMeal(){
        const newMeal = {
            id: nanoid(),
            date: date,
            name: 'Meal',
            total: {
                calories: 0,
                protein: 0,
                fat: 0,
                carbo: 0
            },
            products: []
        }
        setMeals([...meals, newMeal])
    }
    function deleteMeal(id){
        const updatedMeals = meals.filter(meal => meal.id !== id);
        setMeals(updatedMeals);
    }
    const handleItemChange = (id, newName) => {
        setMeals((prev) =>
          prev.map((meal) => (meal.id === id ? { ...meal, name: newName } : meal))
        );
    };
    function showAddProduct(meal){
        setCurrentMeal(meal)
        setAddingProducts(true)
    }
    function hideAddProduct(){
        setCurrentMeal({})
        setAddingProducts(false)
    }
    function addProduct(id, product){
        const mealIndex = meals.findIndex(meal => meal.id === id);
        const updatedMeals = meals.map((meal, index) => {
            if (index !== mealIndex) {
                return meal;
            }
            const updatedMeal = {
                ...meal,
                products: [...meal.products, product]
            }
            
            return updatedMeal;
        });
        setMeals(updatedMeals);
    }

    const prevMealsRef = useRef(meals);

    useEffect(() => {
        setAddingProducts(false)
        for (let i = 0; i < meals.length; i++) {
            const prevProducts = prevMealsRef.current[i]?.products;
            const currentProducts = meals[i]?.products;
            if (prevProducts !== currentProducts) {
                const updatedMeals = meals.map(meal => {
                    const total = meal.products.reduce((acc, cur) => {
                    return {
                        calories: acc.calories + cur.calories,
                        protein: acc.protein + cur.protein,
                        fat: acc.fat + cur.fat,
                        carbo: acc.carbo + cur.carbo
                    };
                    }, { calories: 0, protein: 0, fat: 0, carbo: 0 });
                    
                    return {
                    ...meal,
                    total
                    };
                });
                setMeals(updatedMeals)
            }
      }
      prevMealsRef.current = meals;

      const updateDB = async () => {
          try{
            await updateUserMeals(meals, currentUser.email)
          }catch(error){
            console.log(error)
          }
      }
      if(meals.length > 0){
          updateDB()
      }
      setTodayMeals(meals.filter(meal => {
        return meal.date === date
      }))
    }, [meals]);
    useEffect(() => {
        const getDataOnLoad = async () => {
            try{
                await setWantFetchData(true)
            }catch(error){
                console.log(error)
            }            
        }
        getDataOnLoad()
    }, [])

    useEffect(()=>{
        if(userData){
            setMeals(userData.meals)
        }
    }, [userData])
    function handleDate(e){
        setDate(new Date(e.target.value))
    }
    console.log(todayMeals)

    
    const mealsDOM = meals.map(meal => {
        return <Meal 
        key={meal.id} 
        data={meal}
        showAddProduct={() => showAddProduct(meal)} 
        onChange={(newName) => handleItemChange(meal.id, newName)}
        deleteMeal={(id) => deleteMeal(id)}/>
    })
    if(!userData){
        return <Loading />
    }
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
            <input type="date" onChange={handleDate} defaultValue={date.toISOString().slice(0, 10)}/>
            <div className="dashboard__meals">
                {mealsDOM}
            </div>
            {addingProducts && 
            <AddProduct 
            meal={currentMeal} 
            addProduct={(product) => addProduct(currentMeal.id, product)} 
            hideAddProduct={hideAddProduct} 
            />}
            {userData && !addingProducts && <Total meals={meals} userData={userData} />}
        </div>

    )
}
