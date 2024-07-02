import {useState} from "react";
import {githubUser} from "../model/userModel.ts";
import {Button, Typography} from "@mui/material";
import DialogAddNewGoal from "../components/DialogAddNewGoal.tsx";
import GoalSingleItem from "../components/GoalSingleItem.tsx";
import {Goal} from "../model/goal.ts";
import Motivation from "../components/Motivation.tsx";

type GoalsProps = {
    user: githubUser | null | undefined;
    goals: Goal[];
    addGoal: (newGoal: Goal) => void;
    deleteGoal: (goalId: string) => void;
}

export default function Goals(props: Readonly<GoalsProps>){
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <section>
            <Typography variant={"h5"} className={"text-gray"} py={2}>Deine Motivation</Typography>
            <Motivation user={props.user as githubUser}/>

            <Typography variant={"h5"} className={"text-gray"} py={2}>Deine Ziele</Typography>

            {props.goals.map((goal) => (
                <GoalSingleItem goal={goal} user={props.user} key={goal.goalId} deleteGoal={props.deleteGoal}/>
            ))}

            <Button variant={"outlined"} onClick={handleClickOpen}>Hinzufügen</Button>
            <DialogAddNewGoal user={props.user} open={open} handleClose={handleClose} addGoal={props.addGoal}/>
        </section>
    )
}