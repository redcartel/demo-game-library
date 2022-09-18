import { store } from "../../firebase/fire";
import { collection, getDocs } from "firebase/firestore";
import { useCallback } from "react";

export default function useGetProfileGames() {
    const getProfileGames = useCallback(async (uid) => {
        const path = `users/${uid}/games`;
        console.log(path)
        const games = collection(store, path);
        const docs = await getDocs(games);
        if (docs?.docs && docs.docs.length) {
            return docs.docs.map(doc => doc.data())
        }
        else {
            return [];
        }
    }, [])
    return getProfileGames;
}