import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Goal } from "../model/goal.ts";
import { githubUser } from "../model/userModel.ts";
import { useState } from "react";
import {updateGoal, updateUser} from "../service/userService.ts";

type DialogEditGoalProps = {
    user: githubUser | null | undefined;
    goal: Goal;
    open: boolean;
    handleClose: () => void;
}

export default function DialogEditGoal({ user, goal, open, handleClose }: Readonly<DialogEditGoalProps>) {
    const [goalName, setGoalName] = useState(goal.goalName);
    const [goalPrice, setGoalPrice] = useState(goal.goalPrice);

    const handleSave = async () => {
        // Update the goal
        goal.goalName = goalName;
        goal.goalPrice = goalPrice;
        console.log("fetched user:", user?.id);

        if (user) {
            const goalIndex = user.goals.findIndex(g => g.goalId === goal.goalId);
            if (goalIndex !== -1) {
                user.goals[goalIndex] = goal;
            } else {
                user.goals.push(goal);
            }
            try {
                const goalResponse = await updateGoal(goal, user.id, goal.goalId);
                console.log("Goal updated: ", goalResponse.data);
                const userResponse = await updateUser(user, user.id);
                console.log("User updated: ", userResponse.data);
            } catch (error) {
                console.error("Error updating goal or user: ", error);
            }
        }

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Goal Name"
                    type="text"
                    fullWidth
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="price"
                    label="Goal Price"
                    type="number"
                    fullWidth
                    value={goalPrice}
                    onChange={(e) => setGoalPrice(+e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}