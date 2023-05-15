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
        {bgcolor: 'purple', total: (totalCount.calories).toFixed(2), user: userData.userCalories, sign: 'kcal'},
        {bgcolor: 'red', total: (totalCount.protein).toFixed(2), user: userData.userProtein, sign: 'P'},
        {bgcolor: 'yellow', total: (totalCount.fat).toFixed(2), user: userData.userFat, sign: 'F'},
        {bgcolor: 'blue', total: (totalCount.carbo).toFixed(2), user: userData.userCarbo, sign: 'C'}
    ]
    function tooMuch(e){
        if(e.total / e.user > 1){
            return {color: 'red'}
        }
    }
    const elements = data.map((e, index) => {
        return (
            <div key={index} className="total__item">
                <span>{e.sign}</span>
                <span style={tooMuch(e)}>{e.total} / {e.user}</span>
                <ProgressBar bgcolor={e.bgcolor} completed={(e.total/e.user) * 100}/>
            </div>
        )
    })

    return (
        <div className="total">
          <div className="total__content">
            {elements}
          </div>
        </div>
    )
}

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
        height: 2,
        width: '100%',
        backgroundColor: "#e0e0de",
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${completed >= 100 ? 100 : completed}%`,
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