import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import useSearchGames from "../../utils/hooks/useSearchGames";
import useLookupGame from "../../utils/hooks/useLookupGame";
import useAddGame from "../../utils/hooks/useAddGame";
import { Navigate } from "react-router-dom";
import AddGameDialog from "../../components/AddGameDialog";
import MainSearchForm from "../../components/MainSearchForm";
import GameSearchCard from "../../components/GameSearchCard";

export default function LoggedInMain({ user, userData }) {
    const [searchName, setSearchName] = useState('');
    const [games, setGames] = useState([]);
    const searchGames = useSearchGames();
    const [foundGame, setFoundGame] = useState(null);
    const lookupGame = useLookupGame();
    const addGame = useAddGame();
    const [adding, setAdding] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);

    const search = (event) => {
        setGames(null);
        if (searchName.trim().length > 0) {
            const _games = searchGames(searchName).then(games => setGames(games));
        }
    };

    const add = (event) => {
        if (foundGame?.id) {
            setAdding(true);
            addGame(foundGame).then(() => {
                setAdding(false)
                setFoundGame(null)
                setIsRedirect(true)
            })
        } else {
            setFoundGame(null)
        }
    }

    const findIndividualGame = (game_id) => {
        lookupGame(game_id).then(gameData => setFoundGame(gameData));
    }

    if (isRedirect) {
        return <Navigate to={`/profile/${user.uid}`} />
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AddGameDialog foundGame={foundGame} setFoundGame={setFoundGame} addFn={add} adding={adding} />
            <MainSearchForm searchName={searchName} setSearchName={setSearchName} searchFn={search} />
            {games === null ?
                <CircularProgress sx={{ marginTop: '30vh' }} /> :
                games.map(game => (
                    <GameSearchCard game={game} key={game.id} findGameFn={findIndividualGame} />
                ))}
        </Box>
    )
}