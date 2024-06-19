import {githubUser} from "../model/userModel.ts";

type HomeProps = {
    user: githubUser | null | undefined;
}

export default function Home(props: Readonly<HomeProps>) {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome {props.user?.name}</p>
            <p>{props.user?.id}</p>
        </div>
    )
}