import { useCallback } from "react";
import { functions } from "../../firebase/fire";
import { httpsCallable } from "firebase/functions";

export default function useGetToken() {
    const fetchToken = useCallback(async () => {
        const getApiToken = httpsCallable(functions, 'getApiToken');
        getApiToken({}).then(result => {
            if (result.data.access_token) {
                const exp = new Date();
                exp.setMilliseconds(exp.getMilliseconds() + result.data.expires_in);
                window.localStorage.setItem('igdb_token', result.data.access_token);
                window.localStorage.setItem('igdb_client_id', result.data.client_id);
                window.localStorage.setItem('igdb_expires', exp.toISOString());
            }
        })
    }, []);

    const getToken = useCallback(async () => {
        if (window.localStorage.getItem('igdb_token')) {
            const exp = new Date(window.localStorage.getItem('igdb_expires'));
            if (new Date() < exp) {
                return {
                    token: window.localStorage.getItem('igdb_token'),
                    client_id: window.localStorage.getItem('igdb_client_id')
                }
            }
        }
        await fetchToken();
        return {
            token: window.localStorage.getItem('igdb_token'),
            client_id: window.localStorage.getItem('igdb_client_id')
        }
    }, [])

    return getToken;
}