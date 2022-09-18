import { Typography, Box, Link } from "@mui/material"

export default function Info() {
    return (
        <Box role>
            <Typography variant="h2" align="center">
                About
            </Typography>
            <Typography variant="body1" sx={{ marginTop: '20px' }}>
                Carter Adams made this in September of 2022 to demo React &amp; Firebase. He hopes that someone finds it useful.
            </Typography>
            <Typography sx={{ marginTop: '20px' }}>
                <Link href="https://github.com/redcartel/demo-game-library">
                    https://github.com/redcartel/demo-game-library
                </Link>
            </Typography>
        </Box>
    )
}