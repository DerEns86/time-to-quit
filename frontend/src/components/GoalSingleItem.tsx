import {Goal} from "../model/goal.ts";
import {Box, IconButton, Typography} from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DialogEditGoal from "./DialogEditGoal.tsx";
import {githubUser} from "../model/userModel.ts";
import {useState} from "react";
import { StyledGoalPaper } from "./styles.ts";

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
        <StyledGoalPaper elevation={8} key={goal.goalId} >
            <Box sx={{
                paddingLeft: 2,
                textAlign: 'center',
                maxWidth: 'calc(100% - 40px)'
            }}>
                <Typography variant={"body1"}>{goal.goalName} für {goal.goalPrice}€</Typography>
            </Box>
            <Box style={{width: '40px'}}>
                <IconButton onClick={() => setEditOpen(true)}>
                    <ModeEditOutlineOutlinedIcon color="inherit" fontSize="small"/>
                </IconButton>
                <IconButton onClick={() => deleteGoal(goal.goalId)}>
                    <DeleteOutlineOutlinedIcon color="error" fontSize="small"/>
                </IconButton>
            </Box>
            <DialogEditGoal user={user} goal={goal} open={editOpen} handleClose={handleEditClose} />
        </StyledGoalPaper>
    )
}