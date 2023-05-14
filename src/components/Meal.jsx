import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faPlus, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function Meal({onChange, showAddProduct, data, deleteMeal}) {

    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(data.name)
    const [expand, setExpand] = useState(false)

    const handleInputChange = (event) => {
      setValue(event.target.value);
    }
    function handleDelete(){
      deleteMeal(data.id)
    }
    const handleSave = () => {
      setEditing(false);
      onChange(value);
    }

    const handleClick = () => {
      setEditing(true);
    }
    function expandMeal(){
      setExpand(prev => !prev)
    }
    function rotate() {
      return expand && {
        transform: 'rotate(-90deg)',
        transition: 'transform 0.3s ease-out' // adjust duration and timing function as needed
      };
    }
    const productsElements = data.products.map((product, index) => {
      return (
        <div key={index} className="meal__product">
          <p className='meal__product-name'>{product.name}</p>
          <div className="meal__product-values">
            <span>{product.calories} kcal / {product.value}g</span>
            <span>{product.protein}</span>
            <span>{product.fat}</span>
            <span>{product.carbo}</span>
          </div>
        </div>
      )
      
    })
    return (
      <div className="meal">

        {expand && <FontAwesomeIcon onClick={handleDelete} className='meal__delete' icon={faTrash}></FontAwesomeIcon>}

        <div className="meal__top">
          <FontAwesomeIcon style={rotate()} onClick={expandMeal} className='meal__down' icon={faSquareCaretDown}></FontAwesomeIcon>
          {editing ? (
            <div className="meal__name">
              <input
              type="text"
              value={value}
              onChange={handleInputChange}
              onBlur={handleSave}
              className='meal__input'
              autoFocus
              />
            </div>
          ):(
            <div className="meal__name">
              <div className="meal__name-text">
                <span onClick={handleClick}>{data.name}</span>
                <FontAwesomeIcon onClick={handleClick} icon={faPenToSquare}></FontAwesomeIcon>
              </div>
              <FontAwesomeIcon onClick={showAddProduct} icon={faPlus}></FontAwesomeIcon>
            </div>
          )}
        </div>
        <div className="meal__nutrients">
          <span className='meal__nutrient'>{(data.total.calories).toFixed(2)} kcal</span>
          <span className='meal__nutrient'>P {(data.total.protein).toFixed(2)}</span>
          <span className='meal__nutrient'>F {(data.total.fat).toFixed(2)}</span>
          <span className='meal__nutrient'>C {(data.total.carbo).toFixed(2)}</span>
        </div>
        {expand && (
          <div className="meal__products">
            {productsElements}
          </div>
        )}
      </div>
    )
}
