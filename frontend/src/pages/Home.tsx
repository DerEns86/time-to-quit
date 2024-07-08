import {githubUser} from "../model/userModel.ts";
import "./../main.css";
import {Goal} from "../model/goal.ts";
import SmokeFreeTracker from "../components/SmokeFreeTracker.tsx";
import MoneyProgress from "../components/MoneyProgress.tsx";
import { Typography } from "@mui/material";
import {
    StyledGoalPaperNoActions,
    StyledMotivationPaperNoActions,
    StyledPlaceholderPaper
} from "../components/styles.ts";

type HomeProps = {
    user: githubUser | null | undefined;
    goals: Goal[];
    isTracking: boolean;
    setIsTracking: (active: boolean) => void;
}

export default function Home(props: Readonly<HomeProps>) {

    return (
        <main>
            <Typography
                variant={"h4"}
                className={"text-gray"}
                sx={{textAlign: "center",
                    paddingY: 2
            }}

            >Hallo, {props.user?.username.split(" ")[0]}</Typography>

            <SmokeFreeTracker user={props.user as githubUser}
                              isTracking={props.isTracking}
                              setIsTracking={props.setIsTracking}
            />
            <MoneyProgress user={props.user as githubUser}
                           isTracking={props.isTracking}
                           setIsTracking={props.setIsTracking}
            />

            <section>
                <Typography variant={"subtitle1"} fontWeight={"bold"} className={"text-gray"}>"Warum?"</Typography>
                {props.user?.mainMotivation.length === 0 ? <StyledPlaceholderPaper>Du hast noch keine Motivationen eingegeben</StyledPlaceholderPaper>
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
                    :<StyledPlaceholderPaper>Du hast noch keine Ziele festgelegt</StyledPlaceholderPaper>
                    }
            </section>


        </main>
    )
}