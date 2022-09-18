import { Container, Box, AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Drawer, List, ListItem, ListItemText, ListItemIcon, Dialog, DialogTitle } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";
import AccountIcon from "@mui/icons-material/AccountCircle";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import NavigationDrawer from "../components/NavigationDrawer";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function MainLayout({ children, user }) {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [displayName, setDisplayName] = useState('');

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
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography component="div" sx={{ flexGrow: 1 }}>
                                Game Library
                            </Typography>
                            <Menu
                                anchorEl={menuAnchor}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(menuAnchor)}
                                onClose={handleClose}
                            >
                                <Link to={`/profile/${user.uid}`} onClick={e => setMenuAnchor(null)}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <AccountIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Profile
                                        </ListItemText>
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Log Out
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                            {user.uid ?
                                <Button color="inherit"
                                    onClick={handleUserClick}
                                ><Typography>

                                        {displayName}
                                    </Typography>
                                </Button> :
                                <Button color="inherit"
                                    onClick={handleLogin}
                                >Login</Button>
                            }
                        </Toolbar>
                    </AppBar>
                </header>
            </Box>
            <Box className="mainArea">
                <main>
                    {children}
                </main>
            </Box>
        </Container >
    );
}