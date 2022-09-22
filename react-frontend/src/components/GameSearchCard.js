import { Card, CardContent, Typography, IconButton, Stack } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import { CardTitle, GridCard } from "./styledComponents";

export default function GameSearchCard({ findGameFn, game }) {

    return (
        <GridCard>
            <CardContent>
                <Stack spacing={2}>
                    <Stack spacing={1} direction='row'>
                        <IconButton
                            onClick={e => findGameFn(game.id)}
                        >
                            <AddIcon />
                        </IconButton>
                        <CardTitle>
                            {game.name}
                        </CardTitle>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                        <img style={{ width: '90px', height: '128px' }} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`} />
                        <Typography variant="body">{game.summary?.slice(0, 200)}</Typography>
                    </Stack>
                    {game.first_release_date &&
                        <Typography variant="h6">{new Date(game.first_release_date * 1000).toLocaleDateString()}</Typography>
                    }
                </Stack>
            </CardContent>
        </GridCard >
    )
}