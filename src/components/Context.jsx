import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'
import { getUserData } from '../crud'
const Context = React.createContext()

export function useAuth(){
    return useContext(Context)
}


export function Provider({children}) {
    const [wantFetchData, setWantFetchData] = useState(false)
    const [userData, setUserData] = useState(null)

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const value = {
        currentUser,
        signup,
        login,
        logout,
        setWantFetchData,
        userData
    }
    function logout(){
        return auth.signOut()
    }
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    //login
    useEffect(() => { //get user data after login
        if(currentUser){
            const fetchData = async () => {
                const data = await getUserData('123')
                setUserData(data[0])
            }
            if(wantFetchData){
                console.log('fetching')
                fetchData()
                setWantFetchData(false)
            }
        }
    },[wantFetchData])
    
    

    return (
        <Context.Provider value={value}>
            {!loading && children}
        </Context.Provider>
    )
}
