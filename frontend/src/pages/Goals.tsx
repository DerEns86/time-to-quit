import {useState} from "react";
import {githubUser} from "../model/userModel.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import DialogAddNewGoal from "../components/DialogAddNewGoal.tsx";

type GoalsProps = {
    user: githubUser | null | undefined;
}

export default function Goals(props: Readonly<GoalsProps>){
    const [open, setOpen] = useState(false);
    // const [goals, setGoals] = useState<Goal[]>(props.user?.goals || []);
    const navigate = useNavigate();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            <DialogAddNewGoal user={props.user} open={open} handleClose={handleClose}/>
        </section>
    )
}