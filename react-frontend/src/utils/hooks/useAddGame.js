import useAuthUser from "./useAuthUser";
import { store } from "../../firebase/fire";
import { collection, query, addDoc, getDocs, where } from "firebase/firestore";
import { useCallback } from 'react';

export default function useAddGame() {
    const [user] = useAuthUser();

    const addGame = useCallback(async (gameData) => {
        const games = collection(store, `/users/${user.uid}/games`);
        const q = query(games, where('id', '==', gameData.id))
        const docs = await getDocs(q);
        if (docs.length) {
            return false;
        }
        else {
            await addDoc(games, gameData)
            return true;
        }
    }, [user])

    return addGame;
}