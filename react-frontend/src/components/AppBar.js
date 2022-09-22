import { Typography, Menu, MenuItem, AppBar, Toolbar, IconButton, ListItemIcon, ListItemText, Button } from "@mui/material";
// note that 'Link' exists in both react-router-dom and in material. Use the react-router-dom one for internal links
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export default function TitleAppBar({
    user,
    displayName,
    handleUserClick,
    handleLogin,
    menuAnchor,
    setMenuAnchor,
    toggleDrawer,
    handleClose,
    handleLogout }) {
    return (
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
    );
}