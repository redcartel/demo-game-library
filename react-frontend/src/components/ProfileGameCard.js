import { Card, CardContent, CardActionArea, Typography, Button } from "@mui/material"

export default function ProfileGameCard({ game, removeFn, isSelf }) {
    return (
        <Card sx={{ margin: '10px', display: 'flex', flexDirection: 'column', borderRadius: '10px' }} key={game.id}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ flex: 1 }}>{game.name}</Typography>
                <img style={{ width: '100%' }} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`} />
            </CardContent>
            {isSelf &&
                <CardActionArea>
                    <Button onClick={e => removeFn(game.id)}>Remove from Collection</Button>
                </CardActionArea>
            }
        </Card>
    )
}