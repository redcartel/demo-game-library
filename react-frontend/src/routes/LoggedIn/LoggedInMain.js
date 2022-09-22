import { Box, CircularProgress, Backdrop, Typography } from "@mui/material";
import { useState } from "react";
import useSearchGames from "../../utils/hooks/useSearchGames";
import useLookupGame from "../../utils/hooks/useLookupGame";
import useAddGame from "../../utils/hooks/useAddGame";
import { Navigate } from "react-router-dom";
import AddGameDialog from "../../components/AddGameDialog";
import MainSearchForm from "../../components/MainSearchForm";
import GameSearchCard from "../../components/GameSearchCard";
import { MainSearchGrid } from "../../components/styledComponents";

export default function LoggedInMain({ user, userData }) {

    const [searchName, setSearchName] = useState('');
    const [games, setGames] = useState([]);
    const searchGames = useSearchGames();
    const [foundGame, setFoundGame] = useState(null);
    const [finding, setFinding] = useState(false);
    const lookupGame = useLookupGame();
    const addGame = useAddGame();
    const [adding, setAdding] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);

    const search = (event) => {
        async function doGameSearch() {
            if (searchName.trim().length > 0) {
                setFinding(true);
                const _games = await searchGames(searchName);
                setGames(_games);
                setFinding(false);
            }
        }
        doGameSearch();
    };

    const add = (event) => {
        async function doGameAdd() {
            if (foundGame?.id) {
                setAdding(true);
                await addGame(foundGame);
                setAdding(false)
                setFoundGame(null)
                setIsRedirect(true)
            } else {
                setFoundGame(null);
                setAdding(false)
            }
        }
        doGameAdd();
    }

    const findIndividualGame = (game_id) => {
        async function doFindGame() {
            setFinding(true);
            const gameData = await lookupGame(game_id);
            setFinding(false);
            setFoundGame(gameData)
        }
        doFindGame();
    }

    /* React router makes you do redirects in a kind of dumb way, I like Next's routing better */
    if (isRedirect) {
        return <Navigate to={`/profile/${user.uid}`} />
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* darken the screen and block interaction with a progress indicator if 'finding' is true */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={finding}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <AddGameDialog foundGame={foundGame} setFoundGame={setFoundGame} addFn={add} adding={adding} />

            <MainSearchForm searchName={searchName} setSearchName={setSearchName} searchFn={search} />

            {games === null ?
                <CircularProgress sx={{ marginTop: '30vh' }} /> :
                games.length === 0 ?
                    <Typography align="center">Search for games to add to your collection</Typography> :
                    <MainSearchGrid>
                        {games.map(game => (
                            <GameSearchCard game={game} key={game.id} findGameFn={findIndividualGame} />
                        ))}
                    </MainSearchGrid>
            }
        </Box >
    )
}