import {Goal} from "../model/goal.ts";
import {Box, Card, CardActions, CardContent, IconButton} from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type GoalSingleItemProps = {
    goal: Goal;
}

export default function GoalSingleItem({goal}: Readonly<GoalSingleItemProps>) {


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
                    <IconButton>
                        <ModeEditOutlineOutlinedIcon color="primary" fontSize="small"/>
                    </IconButton>
                    <IconButton>
                        <DeleteOutlineOutlinedIcon color="error" fontSize="small"/>
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    )
}