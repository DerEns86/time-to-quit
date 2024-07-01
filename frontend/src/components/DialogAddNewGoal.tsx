import {githubUser} from "../model/userModel.ts";
import React, {useState} from "react";
import {Goal, GoalDTO} from "../model/goal.ts";
import {addGoal, updateUser} from "../service/userService.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

type Dialog_AddNewGoalProps = {
    user: githubUser | null | undefined;
    open: boolean;
    handleClose: () => void;
    addGoal: (newGoal: Goal) => void;
}

export default function DialogAddNewGoal(props: Readonly<Dialog_AddNewGoalProps>) {
    const [goals, setGoals] = useState<Goal[]>(props.user?.goals || []);
    const [goalName, setGoalName] = useState("");
    const [goalPrice, setGoalPrice] = useState(0);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Goal Name: ", goalName);
        console.log("Goal Price: ", goalPrice);
        const newGoal: GoalDTO = {
            goalName: goalName,
            goalPrice: goalPrice
        };
        if (props.user) {
            await addGoal(newGoal, props.user.id)
                .then(response => {
                    const addedGoal = response.data;
                    setGoals(prevGoals => [...prevGoals, addedGoal]);
                    props.addGoal(addedGoal);
                    console.log(props.user?.goals);
                    console.log(goals)
                    props.user?.goals.push(addedGoal);
                })
                .catch(error => {
                    console.error("Error adding goal: ", error);
                });
            await updateUser(props.user, props.user.id);
        }
        setGoalName("");
        setGoalPrice(0);
        props.handleClose();
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Neues Ziel</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Was möchtes du dir als nächstes kaufen?
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="goalName"
                    name="goalName"
                    label="Goal Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={goalName}
                    onChange={(event) => setGoalName(event.target.value)}
                />
                <TextField
                    required
                    margin="dense"
                    id="goalPrice"
                    name="goalPrice"
                    label="Goal Price"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={goalPrice}
                    onChange={(event) => setGoalPrice(Number(event.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Abbrechen</Button>
                <Button type="submit">Speichern</Button>
            </DialogActions>
        </Dialog>
    )
}