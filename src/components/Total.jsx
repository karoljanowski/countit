import React, { useEffect, useState } from 'react'

export default function Total({meals, userData}) {
    let totalCount = {
        protein: 0,
        calories: 0,
        fat: 0,
        carbo: 0
      };
      
    meals.forEach((meal) => {
    totalCount.protein += meal.total.protein;
    totalCount.calories += meal.total.calories;
    totalCount.fat += meal.total.fat;
    totalCount.carbo += meal.total.carbo;
    });
    const data = [
        {bgcolor: 'purple', completed: totalCount.calories / userData.userCalories, sign: 'kcal'},
        // {bgcolor: 'red', completed: totalCount.protein / userData.userProtein, sign: 'P'},
        // {bgcolor: 'yellow', completed: totalCount.fat / userData.userFat, sign: 'F'},
        // {bgcolor: 'purple', completed: totalCount.carbo / userData.userCarbo, sign: 'C'}
    ]
    const elements = data.map(e => {
        return (
            <div className="total__item">
                <ProgressBar bgcolor={e.bgcolor} completed={e.completed}/>
            </div>
        )
    })

    return (
        <div className="total">
            {elements}
        </div>
    )
}

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
    console.log(completed)
  
    const containerStyles = {
        height: 2,
        width: '100%',
        backgroundColor: "#e0e0de",
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
      }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
      </div>
    );
  };