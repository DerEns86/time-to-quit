import {githubUser} from "../model/userModel.ts";
import {Box, Card, CardContent} from "@mui/material";

type HomeProps = {
    user: githubUser | null | undefined;
}

export default function Home(props: Readonly<HomeProps>) {
    console.log('User data in Home:', props.user);

    function getNotSmokedCigarettes() {
        if (props.user?.quitDate) {
            const quitDate = new Date(props.user.quitDate);
            const today = new Date();
            const diff = today.getTime() - quitDate.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            return days * props.user.dailySmokedCigarettes;
        }
        return 0;
    }

    function savedMoney() {
        return getNotSmokedCigarettes() * 0.35;
    }

    return (
        <div>
            <h1>Home</h1>
            <Box sx={{gap: 2, flexWrap: 'wrap'}}>
                {getNotSmokedCigarettes() > 0 &&
                    <Card variant={"elevation"}>
                        <CardContent>You have not smoked {getNotSmokedCigarettes()} cigarettes</CardContent>

                    </Card>
                }
                {savedMoney() > 0 &&
                    <p>You have saved {savedMoney().toFixed(2)} EUR</p>}
                <p>Welcome {props.user?.username}</p>
                <p >Welcome {props.user?.id}</p>
                <p >{props.user?.dailySmokedCigarettes}</p>
                <p >{props.user?.mainMotivation[0]}</p>
                <p >{props.user?.mainMotivation[1]}</p>
                <p >{props.user?.quitDate ? new Date(props.user.quitDate).toLocaleDateString() : 'N/A'}</p>
                <p >{props.user?.avatar_url}</p>

                <h3>Goals</h3>
                {props.user?.goals.map((goal) => (
                    <div key={goal.goalId}>
                        <p>Goal ID: {goal.goalId}</p>
                        <p>Goal Name: {goal.goalName}</p>
                        <p>Goal Price: {goal.goalPrice}</p>
                        <p>Created At: {goal.createAt}</p>
                        <p>Is Completed: {goal.isCompleted ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </Box>
        </div>
    )
}