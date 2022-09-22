import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AccountIcon from "@mui/icons-material/AccountCircle";

export default function NavigationDrawer({ drawerOpen, setDrawerOpen, user }) {
    return (
        <nav>
            <Drawer open={drawerOpen} anchor={"left"} onClose={() => setDrawerOpen(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={e => setDrawerOpen(false)}
                >
                    <List>

                        <Link to="/">
                            <ListItem button>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>

                        </Link>

                        <Link to="/users">
                            <ListItem button>
                                <ListItemIcon><PeopleIcon /></ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItem>

                        </Link>
                        {
                            /* user.uid will only be 'truthy' if the user is logged in */
                            user.uid &&
                            <Link to={`/profile/${user.uid}`}>
                                <ListItem button>
                                    <ListItemIcon><AccountIcon /></ListItemIcon>
                                    <ListItemText primary="My Profile" />
                                </ListItem>
                            </Link>
                        }
                        <Link to="/about">
                            <ListItem button>
                                <ListItemIcon><InfoIcon /></ListItemIcon>
                                <ListItemText primary="Info" />
                            </ListItem>
                        </Link>
                    </List>
                </Box>
            </Drawer>
        </nav>
    )
}