import { Box, Button, Menu, MenuItem, Avatar } from "@mui/material";
import {githubUser} from "../../model/userModel.ts";
import React from "react";

type HeaderProps = {
    user: githubUser | null | undefined;
    logout: () => void;
}

export default function Header({user, logout}: Readonly<HeaderProps>) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    console.log('User data in Header:', user);

    return (
        <header>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", height: 1}}>
                <h1>Time to Quit</h1>
                {user && (
                    <div>
                        <Button onClick={handleClick} sx={{width: '24px', height: '24px', minWidth: 'unset', p: 0}}>
                            <Avatar sx={{color: 'black', width: 1, height: 1}} src={user.avatar_url} alt={user.username}/>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            onClick={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </Box>
        </header>
    )
}