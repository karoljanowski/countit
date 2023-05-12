import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Meal({onChange, showAddProduct, data}) {

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(data.name);

    const handleInputChange = (event) => {
      setValue(event.target.value);
    };

    const handleSave = () => {
      setEditing(false);
      onChange(value);
    };

    const handleClick = () => {
      setEditing(true);
    };
    const productsElements = data.products.map(product => {
      return <div>
        <p>{product.name}</p>
        <p>/C{product.calories}/P{product.protein}/F{product.fat}/C{product.carbo}</p>
      </div>
      
    })
    return (
      <div>
        <div className='meal'>
          {editing ? (
              <div className='meal__name'>
                  <input
                  type="text"
                  value={value}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  className='meal__input'
                  />
                  <FontAwesomeIcon  onClick={handleSave} icon={faCheck}></FontAwesomeIcon>
              </div>
          ) : (
              <>
                  <div className='meal__name'>
                      <span onClick={handleClick}>{data.name}</span>
                      <FontAwesomeIcon onClick={handleClick} icon={faPenToSquare}></FontAwesomeIcon>
                  </div>
                  <span className='meal__plus'>
                      <FontAwesomeIcon onClick={showAddProduct} icon={faPlus}></FontAwesomeIcon>
                  </span>
              </>
          )}
          <div className="meal__nutrients">
          </div>
        </div>
        {productsElements}
      </div>
    )
}
