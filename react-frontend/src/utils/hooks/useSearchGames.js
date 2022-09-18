import axios from 'axios';
import { httpsCallable } from 'firebase/functions';
import { useCallback } from 'react';
import { functions } from '../../firebase/fire';
import useGetToken from './useGetToken';

export default function useSearchGames() {
    const getToken = useGetToken();

    const searchGames = useCallback(async (nameSnippet) => {
        console.log('searchGames')
        const { token, client_id } = await getToken();
        const search = httpsCallable(functions, 'nameSearch');
        const result = await search({
            nameSnippet,
            token,
            client_id
        })
        return result.data.filter(d => d.first_release_date).sort((a, b) => a.first_release_date - b.first_release_date);
    }, [getToken]);

    return searchGames;
}