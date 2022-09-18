import { Route, Routes } from "react-router";
import Info from "./LoggedOut/Info";
import LoggedInMain from "./LoggedIn/LoggedInMain";
import Profile from "./LoggedIn/Profile";
import UserList from "./LoggedOut/UserList";

export default function LoggedInRouter({ user, userData }) {
    return (
        <Routes>
            <Route exact path="/users" element={<UserList />} />
            <Route exact path="/about" element={<Info />} />
            <Route exact path="/profile/:uid" element={<Profile user={user} userData={userData} />} />
            <Route exact path="/" element={<LoggedInMain user={user} userData={userData} />} />
        </Routes>
    );
}