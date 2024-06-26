import {githubUser} from "../model/userModel.ts";
import {Button} from "@mui/material";

type GoalsProps = {
    user: githubUser | null | undefined;
}

export default function Goals(props: Readonly<GoalsProps>){
    return (
        <>
            <h3>Goals</h3>
            {props.user?.quitDate === null ? <Button>Navigate</Button> :
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

            <Button variant={"outlined"}>Add new goal</Button>
        </>
    )
}