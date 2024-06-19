import {Box, Button} from "@mui/material";
import {githubUser} from "../model/userModel.ts";
import githubLogo from './../assets/github.svg';

type LoginProps = {
    user: githubUser | null | undefined;
    login: () => void;
}

export default function Login({user, login}: Readonly<LoginProps>) {
    return (
        <Box sx={{textAlign: 'center'}}>

            <h3>Du bist nicht angemeldet</h3>
            <h4>Um die App nutzen zu können, logge dich bitte ein</h4>

            {!user && <Button variant="outlined"
                              onClick={login}
                              sx={{ borderColor: 'black' ,color: 'black', '&:hover': { bgcolor: 'darkgray' }, '&:focus': { borderColor: 'black' } }}>
                <img src={githubLogo} className="githubLogo" alt="github logo"/>Login with Github
            </Button>
            }
        </Box>
    )
}