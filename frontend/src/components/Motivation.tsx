import {Button, IconButton, Paper, Typography} from "@mui/material";
import {githubUser} from "../model/userModel.ts";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState} from "react";
import { updateUserMotivation} from "../service/userService.ts";


export default function Motivation( { user }: Readonly<{ user: githubUser }>) {
    const [motivations, setMotivations] = useState<string[]>(user.mainMotivation);
    const [newMotivation, setNewMotivation] = useState('');


    const handleAddMotivation = async () => {
        const updatedMotivations = [...motivations, newMotivation];
        setMotivations(updatedMotivations);
        setNewMotivation('');

        await updateUserMotivation(user, updatedMotivations);
    };

    const handleRemoveMotivation = async (index: number) => {
        const updatedMotivations = motivations.filter((_, i) => i !== index);
        setMotivations(updatedMotivations);

        await updateUserMotivation(user, updatedMotivations);
    };

    return (
        <div>
            {user.mainMotivation.map((motivation, index) => (
                <Paper key={index} >
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