import React, {useState} from "react";
import {githubUser} from "../model/userModel.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Goal, GoalDTO} from "../model/goal.ts";
import { addGoal } from "../service/userService.ts";
import {useNavigate} from "react-router-dom";

type GoalsProps = {
    user: githubUser | null | undefined;
}

export default function Goals(props: Readonly<GoalsProps>){
    const [open, setOpen] = useState(false);
    const [goalName, setGoalName] = useState("");
    const [goalPrice, setGoalPrice] = useState(0);
    const [goals, setGoals] = useState<Goal[]>(props.user?.goals || []);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Goal Name: ", goalName);
        console.log("Goal Price: ", goalPrice);
        const newGoal: GoalDTO = {
            goalName: goalName,
            goalPrice: goalPrice
        };
        if (props.user) {
            addGoal(newGoal, props.user.id)
                .then(response => {
                    const addedGoal = response.data;
                    setGoals(prevGoals => [...prevGoals, addedGoal]);
                    console.log(props.user?.goals);
                    console.log(goals)
                })
                .catch(error => {
                    console.error("Error adding goal: ", error);
                });
        }
        handleClose();
    };


    return (
        <section>
            <h3>Goals</h3>
            {props.user?.quitDate === null ? <Button onClick={()=> navigate("/")}>Navigate</Button> :
                <div >
            {props.user?.goals.map((goal) => (
                <div key={goal.goalId}>
                    <p>Goal ID: {goal.goalId}</p>
                    <p>Goal Name: {goal.goalName}</p>
                    <p>Goal Price: {goal.goalPrice}</p>
                    <p>Created At: {goal.createAt}</p>
                    <p>Is Completed: {goal.isCompleted ? 'Yes' : 'No'}</p>
                </div>
            ))}
                </div>}

            <Button variant={"outlined"} onClick={handleClickOpen}>Add new goal</Button>
            <Dialog
                open={open}
                onClose={handleClose}
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
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button type="submit">Speichern</Button>
                </DialogActions>
            </Dialog>
        </section>
    )
}