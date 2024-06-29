import {githubUser} from "../model/userModel.ts";
import { getNotSmokedCigarettes, savedMoney } from "../utilities/cigaretteUtilities.ts"
import "./../main.css"
import "./../css/home.css"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Goal} from "../model/goal.ts";

type HomeProps = {
    user: githubUser | null | undefined;
    goals: Goal[];
}

export default function Home(props: Readonly<HomeProps>) {
    const navigate = useNavigate();



    console.log('User data in Home:', props.user);
    return (
        <section>
            <h1>Home</h1>
            <div>
                {props.user?.quitDate === null ? <Button onClick={() => navigate("/goals")}>Navigate</Button> :
                <div >
                    {getNotSmokedCigarettes(props.user) > 0 &&
                        <div>
                            You have not smoked {getNotSmokedCigarettes(props.user)} cigarettes
                        </div>
                    }
                    {savedMoney(props.user) > 0 &&
                        <div>You have
                            saved {savedMoney(props.user).toFixed(2)} EUR</div>}
                </div>
                }
                <p>Welcome {props.user?.username}</p>
                <p>Welcome {props.user?.id}</p>
                <p>{props.user?.dailySmokedCigarettes}</p>
                <p>{props.user?.mainMotivation[0]}</p>
                <p>{props.user?.mainMotivation[1]}</p>
                <p>{props.user?.quitDate ? new Date(props.user.quitDate).toLocaleDateString() : 'N/A'}</p>
                <p style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{props.user?.avatar_url}</p>

                <h3>Goals</h3>
                {props.goals.map((goal) => (
                    <div key={goal.goalId}>
                        <p>Goal ID: {goal.goalId}</p>
                        <p>Goal Name: {goal.goalName}</p>
                        <p>Goal Price: {goal.goalPrice}</p>
                        <p>Is Completed: {goal.isCompleted ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}