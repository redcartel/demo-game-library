import functions from "firebase-functions";
import axios from "axios";
import cors from "cors";
import { HttpsError } from "firebase-functions/v1/auth";

const _getApiToken = async () => {
    const url = `https://id.twitch.tv/oauth2/token` +
        `?client_id=${process.env['CLIENT_ID']}` +
        `&client_secret=${process.env['CLIENT_SECRET']}` +
        `&grant_type=client_credentials`;
    const res = await axios.post(url);
    return {
        ...res.data,
        client_id: process.env['CLIENT_ID']
    }
}

// *** Use onCall to write functions that will be called from httpsCallable from the client firebase library *** //
// onRequest is for when you need a more standard http endpoint, like if you need to write a webhook //
// onRequest does NOT set CORS headers and so can't be called from a webapp by default //
export const getApiToken = functions.https.onCall(async (_) => {
    return await _getApiToken();
});

/**
 * Given a search string, return a list of games with their cover image ids
 */
export const nameSearch = functions.https.onCall(async ({ token, client_id, nameSnippet }) => {
    // n.b. This is a function that probably could have been simplified with the 'lodash' library
    // which is like an attempt at a more robust standard lib for JavaScript. It gets tens of millions
    // of downloads a week and won't be going anywhere. I never wind up using it, but it

    // get the games based on search for a word or words in the title
    let response = await axios.post('https://api.igdb.com/v4/games',
        `fields name,summary,first_release_date,id,cover;
             limit 50;
             search "${nameSnippet}";`,
        {
            headers: {
                'Client-ID': client_id,
                authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain'
            }
        });
    if (!response?.data || response.data.length === 0) {
        return [];
    }
    // filter out games with no cover image or release date
    // sort by release date. (!! is a trick to turn a value into true or false)
    // only show first 10 because that's how many covers it seems you can find at once
    const sortedGames = response.data
        .filter(d => (!!d.cover && !!d.first_release_date))
        .sort((a, b) => (a.first_release_date - b.first_release_date))
        .slice(0, 10);
    // list of game ids joined by commas into a string
    const idList = sortedGames.map(d => d.id).join(',');
    // look up the cover image ids (you can get the image url from them) for each game id
    response = await axios.post('https://api.igdb.com/v4/covers',
        `fields game,image_id;
        where game = (${idList});`,
        {
            headers: {
                'Client-ID': client_id,
                authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain'
            }
        });
    if (!response?.data) {
        return sortedGames;
    }
    // create a map from the game ids to the cover image ids
    const gameIdToImageIdMap = response.data.reduce((dict, item) => ({
        ...dict,
        [item.game]: item.image_id
    }), {})
    // add cover image ids to the list of games
    const sortedGamesWithImageIds = sortedGames.map(d => ({
        ...d,
        cover_image_id: gameIdToImageIdMap[d.id]
    }))
    // finally, return that value
    return sortedGamesWithImageIds
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