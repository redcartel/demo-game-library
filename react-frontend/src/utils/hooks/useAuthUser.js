import { useState, useEffect, useCallback } from "react";
import { store, auth } from "../../firebase/fire";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// This is a "Custom Hook"
export default function useAuthUser() {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        auth.onAuthStateChanged((_user) => {
            if (_user) {
                setUser(_user);
            }
            else {
                setUser({});
            }
        });
    }, []);

    const getUserData = useCallback(async () => {
        if (user.uid) {
            const gotUserDoc = await getDoc(doc(store, `/users/${user.uid}`))
            // if user document already exists, update access time and set the state variable
            if (gotUserDoc.data()) {
                const docData = await updateDoc(doc(store, `/users/${user.uid}`), {
                    lastAccess: new Date()
                })
                const gotUserDoc = await getDoc(doc(store, `/users/${user.uid}`))
                setUserData(gotUserDoc.data())
            }
            // otherwise (first login) create a new document
            else {
                await setDoc(doc(store, `/users/${user.uid}`), {
                    lastAccess: new Date(),
                    createdAt: new Date(),
                    email: user.email
                })
                const gotUserDoc = await getDoc(doc(store, `/users/${user.uid}`))
                setUserData(gotUserDoc.data())
            }
        }
        else {
            setUserData({})
        }
    }, [user])

    useEffect(() => {
        getUserData();
    }, [user])

    return [user, userData];
}