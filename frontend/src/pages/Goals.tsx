import {useState} from "react";
import {githubUser} from "../model/userModel.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
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
    const navigate = useNavigate();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <section>

            <Motivation user={props.user as githubUser}/>

            <h3>Goals</h3>
           <Button onClick={()=> navigate("/")}>Navigate</Button>

            {props.goals.map((goal) => (
                <GoalSingleItem goal={goal} user={props.user} key={goal.goalId} deleteGoal={props.deleteGoal}/>
            ))}

            <Button variant={"outlined"} onClick={handleClickOpen}>Add new goal</Button>
            <DialogAddNewGoal user={props.user} open={open} handleClose={handleClose} addGoal={props.addGoal}/>
        </section>
    )
}