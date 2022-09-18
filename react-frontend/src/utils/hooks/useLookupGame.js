import { functions } from '../../firebase/fire';
import { httpsCallable } from 'firebase/functions';
import useGetToken from "./useGetToken";
import { useCallback } from 'react';

export default function useLookupGame() {
    const getToken = useGetToken();
    const lookupGame = useCallback(async (game_id) => {
        console.log("looking up game")
        const { token, client_id } = await getToken();
        const getGame = httpsCallable(functions, "getGame");
        const result = await getGame({ token, client_id, game_id })
        //console.log(result.data);
        return result.data;
    }, [getToken])
    return lookupGame;
}