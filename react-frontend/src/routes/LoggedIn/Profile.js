import { useParams } from "react-router-dom";
import useAuthUser from "../../utils/hooks/useAuthUser";
import { Box, CardContent, CardHeader, CircularProgress, Card, Typography, CardActionArea, Button } from "@mui/material";
import useGetProfileGames from "../../utils/hooks/useGetProfileGames";
import { useEffect, useState } from "react";
import useRemoveGame from "../../utils/hooks/useRemoveGame";
import ProfileGameCard from "../../components/ProfileGameCard";
import useGetUser from "../../utils/hooks/useGetUser";

export default function Profile({ user, userData }) {
    const { uid } = useParams();
    const [games, setGames] = useState(null);
    const removeGame = useRemoveGame();
    const getProfileGames = useGetProfileGames();
    const getUser = useGetUser();
    const [profileUser, setProfileUser] = useState(null);

    useEffect(() => {
        setGames(null)
        if (uid) {
            getProfileGames(uid).then(_games => {
                console.log(_games)
                setGames(_games)
            });
            getUser(uid).then(_user => {
                setProfileUser(_user);
            })
        }
    }, [uid])

    const isSelf = user?.uid === uid;

    function remove(id) {
        if (isSelf) {
            setGames(null)
            removeGame(id).then(() => {
                getProfileGames(uid).then(_games => {
                    setGames(_games)
                });
            })
        }
    }



    return (
        <Box>
            {games === null || profileUser === null ?
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <CircularProgress sx={{ marginTop: '30vh' }} />
                </div> :
                <>
                    <Typography variant='h4' align='center' sx={{ margin: '40px 0px' }}>{profileUser.email}'s games</Typography>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
                    }}> {
                            games.map(game => (
                                <ProfileGameCard game={game} key={game.id} isSelf={isSelf} removeFn={remove} />
                            ))
                        }
                    </div>
                </>
            }
        </Box>
    );
}