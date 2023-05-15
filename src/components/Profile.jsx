import React, {useState, useEffect} from 'react'
import { useAuth } from './Context'
import {updateUserCalories} from '../crud'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'


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
    const [modalText, setModalText] = useState('')
    function handleBack(){
        navigate('/dashboard')
    }
    function closeModal(){
        setDisplayModal(false)
    }
    function macroPercentage(){
        const macroSum = (formData.userCarbo * 4 + formData.userProtein * 4 + formData.userFat * 9)/formData.userCalories
        return macroSum * 100
    }
    function stylePercentage(){
        if(macroPercentage() !== 100){
            return {color: 'red'}
        }
    }
    function handleChange(e){
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    async function handleSubmit(e){
        e.preventDefault()
        if(macroPercentage() === 100){
            try{
                await updateUserCalories(formData, currentUser.email)
                setWantFetchData(true)
                setModalText('Changes saved.')
                setDisplayModal(true)
            }catch{
                console.log(error)
            }
        }else{
            setModalText('Fix your macronutrient breakdown')
            setDisplayModal(true)
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
        return <Loading />
    }

    return (
        <div className="dashboard__main">
            <span className='dashboard__back'>
                <FontAwesomeIcon onClick={handleBack} icon={faArrowLeft}></FontAwesomeIcon>
            </span>
            <h2 className='dashboard__title'>Profile</h2>
            <h2 className='dashboard__subtitle'>Your settings</h2>
            <p className='dashboard__percentage'><span>Macronutrient breakdown:</span><span style={stylePercentage()}>{Number(macroPercentage().toFixed(1))}%</span></p>
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
                <div className="dashboard__input-wrapper">                    
                    <input
                        type="number"
                        id="protein"
                        value={formData.userProtein}
                        name='userProtein'
                        onChange={handleChange}
                        />
                    <span> / {((formData.userProtein * 4 / formData.userCalories) * 100).toFixed(2)}%</span>
                </div>

                <label htmlFor="fat">Fat</label>
                <div className="dashboard__input-wrapper">
                    <input
                        type="number"
                        id="fat"
                        value={formData.userFat}
                        name='userFat'
                        onChange={handleChange}
                        />
                    <span> / {((formData.userFat * 9 / formData.userCalories) * 100).toFixed(2)}%</span>
                </div>
                <label htmlFor="carbo">Carbo</label>
                <div className="dashboard__input-wrapper">  
                    <input
                        type="number"
                        id="carbo"
                        value={formData.userCarbo}
                        name='userCarbo'
                        onChange={handleChange}
                        />
                    <span> / {((formData.userCarbo * 4 / formData.userCalories) * 100).toFixed(2)}%</span>
                </div>
                <div className='dashboard__form-buttons'>
                    <button onClick={handleCancel} type='button'>Cancel</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </form>
            {displayModal && <Modal closeModal={closeModal} text={modalText}/>}
        </div>
        

    )
}
