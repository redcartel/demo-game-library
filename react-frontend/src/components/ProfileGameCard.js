import { Card, CardActionArea, Button, Stack, Typography } from "@mui/material"
import { CardTitleBig, GridCard, CardActionAreaRemove } from "./styledComponents"
import CloseIcon from "@mui/icons-material/CloseRounded"

export default function ProfileGameCard({ game, removeFn, isSelf }) {
    return (
        <GridCard key={game.id}>
            <CardTitleBig variant='h6' sx={{ flex: 1 }}>{game.name}</CardTitleBig>
            <Stack>
                <Stack flexDirection="column" spacing={2}>
                    <img
                        alt={game.name}
                        style={{ width: '100%' }}
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`} />
                </Stack>
                {
                    /* isSelf should be true if the user is looking at their own profile */
                    isSelf &&
                    <CardActionAreaRemove onClick={e => removeFn(game.id)}>
                        <CloseIcon />
                        <Typography variant='h6'>Remove from Collection </Typography>
                    </CardActionAreaRemove>
                }
            </Stack>
        </GridCard>
    )
}