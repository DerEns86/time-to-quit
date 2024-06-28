import {useState} from "react";
import {githubUser} from "../model/userModel.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import DialogAddNewGoal from "../components/DialogAddNewGoal.tsx";
import GoalSingleItem from "../components/GoalSingleItem.tsx";

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
           <Button onClick={()=> navigate("/")}>Navigate</Button>

            {props.user?.goals.map((goal) => (
                <GoalSingleItem goal={goal} key={goal.goalId}/>
            ))}


            <Button variant={"outlined"} onClick={handleClickOpen}>Add new goal</Button>
            <DialogAddNewGoal user={props.user} open={open} handleClose={handleClose}/>
        </section>
    )
}