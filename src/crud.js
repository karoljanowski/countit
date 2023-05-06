import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc


} from 'firebase/firestore'
import {
    db
} from './firebase'

const userCollectionRef = collection(db, "Users")

export const getUserData = async (email) => {
    const q = query(userCollectionRef, where('userEmail', '==', email));
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs.map((doc) => doc.data());
    return userData;

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
export const updateUserCalories = async (data, email) => {
    const q = query(userCollectionRef, where('userEmail', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
            userCalories: data.userCalories,
            userProtein: data.userProtein,
            userFat: data.userFat,
            userCarbo: data.userCarbo
        });
    });
};