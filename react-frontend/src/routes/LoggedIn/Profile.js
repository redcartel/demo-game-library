import { useParams } from "react-router-dom";
import useAuthUser from "../../utils/hooks/useAuthUser";
import { Box, CardContent, CardHeader, CircularProgress, Card, Typography, CardActionArea, Button } from "@mui/material";
import useGetProfileGames from "../../utils/hooks/useGetProfileGames";
import { useEffect, useState } from "react";
import useRemoveGame from "../../utils/hooks/useRemoveGame";
import ProfileGameCard from "../../components/ProfileGameCard";
import useGetUser from "../../utils/hooks/useGetUser";
import { CenteredFlex, ProfileGrid } from "../../components/styledComponents";

export default function Profile({ user, userData }) {
    const { uid } = useParams();
    const [games, setGames] = useState(null);
    const removeGame = useRemoveGame();
    const getProfileGames = useGetProfileGames();
    const getUser = useGetUser();
    const [profileUser, setProfileUser] = useState(null);

    useEffect(() => {
        /* if you have to do something async within a useEffect, my preferred way is to
        declare an async function and call it, rather than messing with .then() */
        async function getGameAndUserInfo() {
            setGames(null)
            if (uid) {
                // resolve two promises at once:
                const simultaneousPromises = [getProfileGames(uid), getUser(uid)]
                const [_games, _user] = await Promise.all(simultaneousPromises);

                setGames(_games);
                setProfileUser(_user);
            }
        }
        getGameAndUserInfo();
    }, [uid])

    const isSelf = user?.uid === uid;

    function remove(id) {
        async function removeGameAndRefresh(_id) {
            if (isSelf) {
                setGames(null)
                await removeGame(_id);
                const _games = await getProfileGames(uid);
                setGames(_games)
            }
        }
        removeGameAndRefresh(id)
    }



    return (
        <Box>
            {games === null || profileUser === null ?
                <CenteredFlex>
                    <CircularProgress sx={{ marginTop: '30vh' }} />
                </CenteredFlex> :
                <>
                    <Typography variant='h4' align='center' sx={{ margin: '40px 0px' }}>{profileUser.email}'s games</Typography>
                    <ProfileGrid>
                        {
                            games.map(game => (
                                <ProfileGameCard game={game} key={game.id} isSelf={isSelf} removeFn={remove} />
                            ))
                        }
                    </ProfileGrid>
                </>
            }
        </Box>
    );
}