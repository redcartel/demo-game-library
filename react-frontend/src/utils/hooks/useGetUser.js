import { getDoc, doc } from "firebase/firestore";
import { store } from "../../firebase/fire";
import { useCallback } from "react";

export default function useGetUser() {
    const getUser = useCallback(async (uid) => {
        const document = await getDoc(doc(store, `/users/${uid}`))
        return document?.data() ?? { email: 'Not Found' };
    }, [])

    return getUser;
}