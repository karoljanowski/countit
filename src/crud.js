import {
    addDoc,
    collection,
    getDocs,
    query,
    where,


} from 'firebase/firestore'
import {
    db
} from './firebase'

const userCollectionRef = collection(db, "Users")

export const getUserData = async (email) => {
    const q = query(userCollectionRef, where('userEmail', '==', 'test@test.pl'));
    try {
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        return userData;
    } catch (error) {
        console.log(error);
    }
}
export const createUser = async (email) => {
    await addDoc(userCollectionRef, {
        userEmail: email,
        userCalories: 0,
        userProtein: 0,
        userFat: 0,
        userCarbo: 0
    })
}
// export const createUsers = async (id) =>{

// }