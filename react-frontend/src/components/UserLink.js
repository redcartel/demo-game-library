import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserLink({ user }) {
    console.log(user)
    return (
        <Link to={`/profile/${user.uid}`}>
            <Card sx={{ margin: '20px' }}>
                <CardContent>
                    <Typography>{user.email}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}