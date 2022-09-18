import functions from "firebase-functions";
import axios from "axios";
import cors from "cors";
import { HttpsError } from "firebase-functions/v1/auth";

const _getApiToken = async () => {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env['CLIENT_ID']}&client_secret=${process.env['CLIENT_SECRET']}&grant_type=client_credentials`;
    console.warn("URL:")
    console.warn(url);
    try {
        const res = await axios.post(url);
        return {
            ...res.data,
            client_id: process.env['CLIENT_ID']
        }
    }
    catch (e) {
        console.error(e);
        throw new HttpsError("internal", "Could not retrieve API token")
    }
}

// *** USE onCall to write functions that will be called from the client firebase library *** //
export const getApiToken = functions.https.onCall(async (_) => {
    return await _getApiToken();
});

export const nameSearch = functions.https.onCall(async ({ token, client_id, nameSnippet }) => {
    const response = await axios.post('https://api.igdb.com/v4/games',
        `fields name,summary,first_release_date,cover,id;
             limit 100;
             search "${nameSnippet}";`,
        {
            headers: {
                'Client-ID': client_id,
                authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain'
            }
        });
    if (response.data) {
        return response.data;
    }
    return []
});

export const getGame = functions.https.onCall(async ({ token, client_id, game_id }) => {
    const response = await axios.post('https://api.igdb.com/v4/games',
        `fields *;
         where id=${game_id};`,
        {
            headers: {
                'Client-ID': client_id,
                authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain'
            }
        });
    if (!response.data || !response.data.length) {
        return {};
    }
    const gameData = response.data;
    if (!gameData[0].cover) {
        return gameData;
    }
    const coverResponse = await axios.post('https://api.igdb.com/v4/covers',
        `fields *;
        where id = ${gameData[0].cover};`,
        {
            headers: {
                'Client-ID': client_id,
                authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain'
            }
        });
    if (!coverResponse.data || !coverResponse.data.length) {
        return gameData;
    }
    return {
        ...gameData[0],
        cover_image_id: coverResponse.data[0].image_id
    }
})