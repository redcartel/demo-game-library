import { collection, getDocs } from "firebase/firestore";
import { store } from "../../firebase/fire";
import { useCallback } from "react";

export default function useGetUsers() {
    const getUsers = useCallback(async () => {
        const users = collection(store, `/users`);
        const userDocs = await getDocs(users);
        return userDocs?.docs.map(doc => {
            const data = doc.data();
            return {
                email: data.email,
                uid: doc.id
            }
        })
    }, [])

    return getUsers;
}