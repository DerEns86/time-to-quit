import {Goal} from "../model/goal.ts";
import {Box, Card, CardActions, CardContent, IconButton} from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DialogEditGoal from "./DialogEditGoal.tsx";
import {githubUser} from "../model/userModel.ts";
import {useState} from "react";

type GoalSingleItemProps = {
    goal: Goal;
    user: githubUser | null | undefined;
    deleteGoal: (goalId: string) => void;
}

export default function GoalSingleItem({goal, user, deleteGoal}: Readonly<GoalSingleItemProps>) {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditClose = () => {
        setEditOpen(false);
    };

    console.log("GoalSingleItem user:", user);

    return (
        <Card variant="elevation" key={goal.goalId} sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            maxWidth: "300px",

        }}>
            <CardContent sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "unset",
            }}>
                <Box>
                    <p>Goal Name: {goal.goalName}</p>
                    <p>Goal Price: {goal.goalPrice}</p>
                    {/*<p>Is Completed: {goal.isCompleted ? 'Yes' : 'No'}</p>*/}
                </Box>
                <CardActions sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}>
                    <IconButton onClick={() => setEditOpen(true)}>
                        <ModeEditOutlineOutlinedIcon color="primary" fontSize="small"/>
                    </IconButton>
                    <IconButton onClick={() => deleteGoal(goal.goalId)}>
                        <DeleteOutlineOutlinedIcon color="error" fontSize="small"/>
                    </IconButton>
                </CardActions>
            </CardContent>

            <DialogEditGoal user={user} goal={goal} open={editOpen} handleClose={handleEditClose} />
        </Card>
    )
}