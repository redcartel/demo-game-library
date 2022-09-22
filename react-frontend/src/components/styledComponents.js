import { Card, CardActionArea } from "@mui/material";
import { styled } from "@mui/system";

/* Styled components are cool. A way of creating new components that uses mostly the same syntax as the
theme.

They make your layout code read better, IMO. I'm actually pretty bad about not using them myself
in my real projects, but here's how they work. The dude doing the frontend on the video streaming service
is all about them and it's really nice. 

Basically if you need to create a component that is just an html or mui element but with some style
variations, this is a good way to do it.
*/

export const MainSearchGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
}))

export const CardTitle = styled('h4')(({ theme }) => ({
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
    visibility: 'visible',
    padding: '0px 10px'
}))

export const CardTitleBig = styled('h4')(({ theme }) => ({
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
    visibility: 'visible',
    padding: '0px 10px'
}))

export const GridCard = styled(Card)(({ theme }) => ({
    margin: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column'
}))

export const CardActionAreaRemove = styled(CardActionArea)(({ theme }) => ({
    color: 'salmon',
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 10px',
    alignItems: 'center'
}))

export const ProfileGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
}))

export const CenteredFlex = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
}))