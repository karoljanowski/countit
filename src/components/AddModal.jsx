import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function AddModal({data, save, hide}) {
    const [value, setValue] = useState(100)
    const [nutrients, setNutrients] = useState({
        calories: Number(data.nutriments["energy-kcal_100g"]),
        protein: Number(data.nutriments["fat_100g"]),
        fat: Number(data.nutriments["proteins_100g"]),
        carbo: Number(data.nutriments["carbohydrates_100g"])
    })
    function handleChange(e){
        setValue(e.target.value)
    }
    useEffect(() => {
        setNutrients({
            calories: Number((data.nutriments["energy-kcal_100g"] / 100) * value),
            protein: Number((data.nutriments["fat_100g"] / 100) * value),
            fat: Number((data.nutriments["proteins_100g"] / 100) * value),
            carbo: Number((data.nutriments["carbohydrates_100g"] / 100) * value)
        })
    }, [value])
    function handleClick(){
        save({
            name: data.product_name,
            calories: nutrients.calories,
            protein: nutrients.protein,
            fat: nutrients.fat,
            carbo: nutrients.carbo,
            value: value
        })
    }
    function setHide(){
        hide()
    }
    return (
        <div className="modal">
            <div className="modal__content">
                <div className="modal__top">
                    <p>Adding {data.product_name}</p>
                    <span className='modal__icon'>
                    <FontAwesomeIcon onClick={setHide} icon={faXmark}></FontAwesomeIcon>
                    </span>
                </div>
                <p className='modal__nutrients'>Calories: {(nutrients.calories).toFixed(2)}</p>
                <p className='modal__nutrients'>Fat: {(nutrients.protein).toFixed(2)}</p>
                <p className='modal__nutrients'>Protein: {(nutrients.fat).toFixed(2)}</p>
                <p className='modal__nutrients'>Carbohydrates: {(nutrients.carbo).toFixed(2)}</p>
                <input className='modal__input' type="number" placeholder='Amount' value={value} onChange={handleChange}/>
                <button className='modal__button' onClick={handleClick}>Add</button>
            </div>
        </div>
    )
}
      // const newProduct = {
      //   name: product.product_name,
      //   calories: Number(product.nutriments["energy-kcal_100g"]),
      //   protein: Number(product.nutriments["fat_100g"]),
      //   fat: Number(product.nutriments["proteins_100g"]),
      //   carbo: Number(product.nutriments["carbohydrates_100g"])
      // }