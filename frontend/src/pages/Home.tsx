import {githubUser} from "../model/userModel.ts";
import "./../main.css"
import "./../css/home.css"
import {Goal} from "../model/goal.ts";
import SmokeFreeTracker from "../components/SmokeFreeTracker.tsx";
import MoneyProgress from "../components/MoneyProgress.tsx";

type HomeProps = {
    user: githubUser | null | undefined;
    goals: Goal[];
}

export default function Home(props: Readonly<HomeProps>) {

    return (
        <section>
            <h1>Willkommen <br/>{props.user?.username}</h1>
            <div>
                <SmokeFreeTracker user={props.user as githubUser}/>
                <MoneyProgress user={props.user as githubUser}/>

                <h4>Motivation</h4>
                {props.user?.mainMotivation.length === 0 ? <div>Du hast noch keine Motivationen gesetzt</div>
                    : <div>
                        {props.user?.mainMotivation.map((motivation) => {
                            return <div
                                key={motivation}>
                                {motivation}
                            </div>
                        })}

                    </div>
                }


                <h4>Goals</h4>
                {props.goals.length > 0 ? <div>Du hast dir {props.goals.length} Ziele gesetzt</div>
                    : <div>Du hast noch keine Ziele gesetzt</div>}
            </div>
        </section>
    )
}