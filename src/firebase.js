import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
    getFirestore
} from 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBNxHN2OFRY3HryX58WQRakA19GEloMiZA",
    authDomain: "countit-25326.firebaseapp.com",
    projectId: "countit-25326",
    storageBucket: "countit-25326.appspot.com",
    messagingSenderId: "506759270236",
    appId: "1:506759270236:web:d6cadb568ba3a4f78a3b99"
})

export const auth = app.auth()
export const db = getFirestore(app)
export default app