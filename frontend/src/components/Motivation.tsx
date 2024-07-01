import {Button, IconButton, Paper, Typography} from "@mui/material";
import {githubUser} from "../model/userModel.ts";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState} from "react";
import { updateUserMotivation} from "../service/userService.ts";


export default function Motivation( { user }: Readonly<{ user: githubUser }>) {
    const [currentUser, setCurrentUser] = useState(user);
    const [newMotivation, setNewMotivation] = useState('');

    const handleAddMotivation = () => {
        const updatedMotivation = [...currentUser.mainMotivation, newMotivation];
        updateUserMotivation(currentUser, updatedMotivation)
            .then(updatedUser => {
                setCurrentUser(updatedUser);
                setNewMotivation('');
            });
    };

    const handleRemoveMotivation = (index: number) => {
        const updatedMotivation = currentUser.mainMotivation.filter((_, i) => i !== index);
        updateUserMotivation(currentUser, updatedMotivation)
            .then(updatedUser => {
                setCurrentUser(updatedUser);
            });
    };

    return (
        <div>
            {user.mainMotivation.map((motivation, index) => (
                <Paper key={motivation} >
                    <Typography variant="body1">{motivation}</Typography>
                    <div >

                        <IconButton onClick={() => handleRemoveMotivation(index)}>
                            <DeleteOutlineOutlinedIcon color="error" fontSize="small"/>
                        </IconButton>
                    </div>
                </Paper>
            ))}
            <Button size="small" color="primary" onClick={handleAddMotivation}>
                Hinzufügen
            </Button>
        </div>
    )
}