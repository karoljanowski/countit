import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Meal({name, onChange}) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(name);
  
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
  
    return (
      <div className='meal'>
        {editing ? (
            <div className='meal__name'>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={handleSave}
            autoFocus
            />
            <FontAwesomeIcon  onClick={handleSave} icon={faCheck}></FontAwesomeIcon>
            </div>
        ) : (
            <div className='meal__name'>
            <span onClick={handleClick}>{name}</span>
            <FontAwesomeIcon onClick={handleClick} icon={faPenToSquare}></FontAwesomeIcon>
            </div>
        )}
        <FontAwesomeIcon onClick={handleClick} icon={faPlus}></FontAwesomeIcon>
      </div>
    );
}
