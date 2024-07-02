import {githubUser} from "../model/userModel.ts";
import "./../main.css"
import "./../css/home.css"
import {Goal} from "../model/goal.ts";
import SmokeFreeTracker from "../components/SmokeFreeTracker.tsx";
import MoneyProgress from "../components/MoneyProgress.tsx";
import {useState} from "react";
import {Box, Typography} from "@mui/material";
import {StyledGoalPaperNoActions, StyledMotivationPaperNoActions} from "../components/styles.ts";

type HomeProps = {
    user: githubUser | null | undefined;
    goals: Goal[];
}

export default function Home(props: Readonly<HomeProps>) {
    const [isTracking, setIsTracking] = useState<boolean>(false);

    return (
        <main>
            <Typography
                variant={"h4"}
                className={"text-gray"}
                sx={{textAlign: "center",
                    paddingY: 2
            }}

            >Willkommen {props.user?.username}</Typography>

            <SmokeFreeTracker user={props.user as githubUser}
                              isTracking={isTracking}
                              setIsTracking={setIsTracking}
            />
            <MoneyProgress user={props.user as githubUser}
                           isTracking={isTracking}
                           setIsTracking={setIsTracking}
            />

            <section>
                <Typography variant={"subtitle1"} fontWeight={"bold"} className={"text-gray"}>"Warum?"</Typography>
                {props.user?.mainMotivation.length === 0 ? <div>Du hast noch keine Motivationen gesetzt</div>
                    : props.user?.mainMotivation.map((motivation) => {
                        return <StyledMotivationPaperNoActions
                            variant={"elevation"}
                            elevation={8}
                            key={motivation}>
                            {motivation}
                        </StyledMotivationPaperNoActions>
                    })
                }
            </section>
            <section>
                <Typography variant={"subtitle1"} fontWeight={"bold"} className={"text-gray"}>"Wofür?"</Typography>
                {props.goals.length > 0 ?
                    <>
                        {props.user?.goals.length === 1 ?
                            <Typography variant={"body2"} className={"text-gray"} pb={0.5}
                            >
                                Du hast dir {props.goals.length} Ziel gesetzt</Typography> :
                            <Typography variant={"body2"} className={"text-gray"} pb={0.5}
                            >
                                Du hast dir {props.goals.length} Ziele gesetzt</Typography>}
                        {props.goals.map((goal) => {
                            return <StyledGoalPaperNoActions variant={"elevation"} elevation={8} key={goal.goalId}>
                                <Typography variant={"body1"}>{goal.goalName}</Typography>
                                <Typography variant={"body2"} fontWeight={"bold"}>{goal.goalPrice}€</Typography>
                            </StyledGoalPaperNoActions>
                        })}
                    </>
                    : <Box>Du hast noch keine Ziele festgelegt</Box>}
            </section>


        </main>
    )
}