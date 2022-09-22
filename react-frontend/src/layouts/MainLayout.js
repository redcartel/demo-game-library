import { Container, Box } from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useState, useEffect } from "react";
import NavigationDrawer from "../components/NavigationDrawer";
import TitleAppBar from "../components/AppBar";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function MainLayout({ children, user }) {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [menuAnchor, setMenuAnchor] = useState(null);

    function handleUserClick(event) {
        setMenuAnchor(event.currentTarget);
    }

    function handleClose(event) {
        setMenuAnchor(null);
    }

    function handleLogin(event) {
        signInWithPopup(auth, provider);
    }

    function handleLogout(event) {
        setMenuAnchor(null);
        auth.signOut();
    }

    function toggleDrawer(event) {
        setDrawerOpen(drawerOpen => !drawerOpen);
    }

    useEffect(() => {
        // remove the @whatever.com from a user's email to make a shorter display name
        if (user.email) {
            const pattern = /([^@]+)@.*/
            const m = user.email.match(pattern)
            if (m) {
                setDisplayName(m[1]);
            }
            else {
                setDisplayName('user')
            }
        }
        else {
            setDisplayName('');
        }
    }, [user])

    return (
        <Container className="mainLayout">
            <Box className='appBarContainer'>
                <NavigationDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} user={user} />
                <header>
                    {/* 
                        Cases where you have to pass a ton of props down to another component are a bummer, try to avoid it.
                        but expanding an object of props with a ... is one way to do it that sucks a little less.
                    */}
                    <TitleAppBar
                        {...{
                            user,
                            displayName,
                            handleUserClick,
                            handleLogin,
                            menuAnchor,
                            setMenuAnchor,
                            handleClose,
                            handleLogout,
                            toggleDrawer
                        }}
                    />
                </header>
            </Box>
            <Box className="mainArea">
                <main>
                    {/* This is how you make a component that wraps other components */}
                    {children}
                </main>
            </Box>
        </Container >
    );
}