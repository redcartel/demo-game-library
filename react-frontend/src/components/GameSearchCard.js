import { Card, CardContent, Typography, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";

export default function GameSearchCard({ findGameFn, game }) {
    return (
        <Card key={game.id} sx={{ width: '100%', margin: '20px' }}>
            <CardContent>
                <Typography variant="h4">
                    <IconButton
                        onClick={e => findGameFn(game.id)}
                    >
                        <AddIcon />
                    </IconButton>
                    {game.name}</Typography>
                <Typography variant="body">{game.summary?.slice(0, 200)}</Typography>
                {game.first_release_date &&
                    <Typography variant="h6">{new Date(game.first_release_date * 1000).toLocaleDateString()}</Typography>
                }
            </CardContent>
        </Card>
    )
}