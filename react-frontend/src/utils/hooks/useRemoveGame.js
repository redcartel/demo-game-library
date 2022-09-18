import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { useCallback } from "react";
import { store } from "../../firebase/fire";
import useAuthUser from "./useAuthUser";

export default function useRemoveGame() {
    const [user] = useAuthUser();

    const removeGame = useCallback(async (id) => {
        const games = collection(store, `/users/${user.uid}/games`);
        const q = query(games, where('id', '==', id))
        const qDocs = await getDocs(q);
        if (qDocs?.docs?.length) {
            for (let doc of qDocs.docs) {
                await (deleteDoc(doc.ref))
            }
        }
    }, [user])

    return removeGame;
}