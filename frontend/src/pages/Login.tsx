import {Button} from "@mui/material";
import {githubUser} from "../model/userModel.ts";

type LoginProps = {
    user: githubUser | null | undefined;
    login: () => void;
}

export default function Login({ user, login }: Readonly<LoginProps>) {
    return (
        <>
            <div>
                <h2>Login</h2>
            </div>
            {!user && <Button variant="outlined" onClick={login}>
                Login
            </Button>
            }
        </>
    )
}