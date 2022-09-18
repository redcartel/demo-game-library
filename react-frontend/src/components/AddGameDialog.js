import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from "@mui/material"

export default function AddGameDialog({ foundGame, setFoundGame, addFn, adding }) {
    return (
        <Dialog open={foundGame !== null} onClose={e => setFoundGame(null)}>
            <DialogTitle>Add {foundGame?.name}?</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {
                    adding ?
                        <CircularProgress sx={{ marginTop: '40px' }} /> :
                        foundGame?.cover_image_id &&
                        <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${foundGame.cover_image_id}.jpg`} />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={e => addFn()} disabled={adding}>Add To Collection</Button>
                <Button sx={{ backgroundColor: '#aaa', color: 'black' }} onClick={e => setFoundGame(null)} disabled={adding}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}