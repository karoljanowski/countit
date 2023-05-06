import React, {useState, useEffect} from 'react'
import { useAuth } from './Context'
import {updateUserCalories} from '../crud'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


export default function Profile() {
    const {currentUser, userData, setWantFetchData} = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userCalories: 0,
        userProtein: 0,
        userFat: 0,
        userCarbo: 0
    })
    const [displayModal, setDisplayModal] = useState(false)
    function handleBack(){
        navigate('/dashboard')
    }
    function closeModal(){
        setDisplayModal(false)
    }
    function isMacroEqual(){
        const macroSum = formData.userCarbo * 4 + formData.userProtein * 4 + formData.userFat * 9
        if(macroSum == formData.userCalories){
            return true
        }else{
            return false
        }
    }
    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    async function handleSubmit(e){
        e.preventDefault()
        if(isMacroEqual()){
            try{
                await updateUserCalories(formData, currentUser.email)
                setWantFetchData(true)
                setDisplayModal(true)
            }catch{
                console.log(error)
            }
        }else{
            console.log('bad calories')
        }
    }
    function handleCancel(){
        setFormData({
            userCalories: userData.userCalories,
            userProtein: userData.userProtein,
            userFat: userData.userFat,
            userCarbo: userData.userCarbo
        })
    }
    
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
            setFormData({
                userCalories: userData.userCalories,
                userProtein: userData.userProtein,
                userFat: userData.userFat,
                userCarbo: userData.userCarbo
            })
        }
    }, [userData])

    if(!userData){
        return <h1>Loading...</h1>
    }

    return (
        <div className="dashboard__main">
            <FontAwesomeIcon style={{color: "#263A29",}} size='xl' onClick={handleBack} icon={faArrowLeft}></FontAwesomeIcon>
            <h1 className='dashboard__title'>Profile</h1>
            <h2 className='dashboard__subtitle'>Your settings</h2>
            <form className='dashboard__calorie-form'>
                <label htmlFor="calories">Calories</label>
                <input
                    type="number"
                    id="calories"
                    value={formData.userCalories}
                    name='userCalories'
                    onChange={handleChange}
                    />

                <label htmlFor="protein">Protein</label>
                <input
                    type="number"
                    id="protein"
                    value={formData.userProtein}
                    name='userProtein'
                    onChange={handleChange}
                    />

                <label htmlFor="fat">Fat</label>
                <input
                    type="number"
                    id="fat"
                    value={formData.userFat}
                    name='userFat'
                    onChange={handleChange}
                    />

                <label htmlFor="carbo">Carbo</label>
                <input
                    type="number"
                    id="carbo"
                    value={formData.userCarbo}
                    name='userCarbo'
                    onChange={handleChange}
                    />
                <div className='dashboard__form-buttons'>
                    <button onClick={handleCancel} type='button'>Cancel</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </form>
            {displayModal && <Modal closeModal={closeModal} text={'Changes saved'}/>}
        </div>
        

    )
}
