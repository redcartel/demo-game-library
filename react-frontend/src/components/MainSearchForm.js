import { TextField, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MainSearchForm({ searchName, setSearchName, searchFn }) {
    return (
        <span style={{ marginTop: '40px' }}>
            <TextField value={searchName}
                onChange={e => setSearchName(e.target.value)}
                label="Game Title"
            />
            <Button
                startIcon={<Typography variant="h1"><SearchIcon
                    sx={{
                        fontSize: '42px',
                        '@media (max-width: 600px)': {
                            fontSize: '32px'
                        }
                    }}
                /></Typography>}
                onClick={e => {
                    searchFn(e);
                }}><Typography>Search</Typography></Button>
        </span>
    )
}