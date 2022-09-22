import { createTheme, responsiveFontSizes } from "@mui/material";

// You can do all kinds of stuff with this, but I don't know much about it, TBH
let theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

theme = responsiveFontSizes(theme)

theme.typography.body2 = {
    fontSize: '.9rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '.7rem',
    },
}

theme.typography.body1 = {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem',
    },
}

theme.typography.h6 = {
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
}

theme.typography.h5 = {
    fontSize: '1.4rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}

theme.typography.h4 = {
    fontSize: '1.6rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.4rem',
    },
}

theme.typography.h3 = {
    fontSize: '1.8rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.6rem',
    },
}

theme.typography.h2 = {
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
    },
}

theme.typography.h1 = {
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.2rem',
    },
}

theme.components.MuiTextField = {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '.7rem',
    },
}

export default theme;