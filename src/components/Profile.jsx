import React, {useState, useEffect} from 'react'
import { useAuth } from './Context'

export default function Profile() {
    const {currentUser, userData, setWantFetchData} = useAuth()
    

    useEffect(() => {
        setWantFetchData(true)
    }, [])
    console.log(userData)

    if(!userData){
        return <h1>Loading...</h1>
    }

    return (
        <h1>{userData.userFat}</h1>

    )
}
