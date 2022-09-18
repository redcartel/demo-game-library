import { Route, Routes } from "react-router";
import Info from "./LoggedOut/Info";
import LoggedOutMain from "./LoggedOut/LoggedOutMain";
import UserList from "./LoggedOut/UserList";
import Profile from "./LoggedIn/Profile";

export default function LoggedOutRouter() {
    return (
        <Routes>
            <Route exact path="/users" element={<UserList />} />
            <Route exact path="/about" element={<Info />} />
            <Route exact path="/profile/:uid" element={<Profile />} />
            <Route exact path="/" element={<LoggedOutMain />} />
        </Routes>
    )
}