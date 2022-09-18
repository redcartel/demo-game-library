import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLink from "../../components/UserLink";
import useGetUsers from "../../utils/hooks/useGetUsers"

export default function UserList() {
    const getUsers = useGetUsers();
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(_users => setUsers(_users))
    }, [])

    return (
        <Box>
            {users.map(user =>
                <UserLink user={user} key={user.uid} />
            )}
        </Box>
    )
}