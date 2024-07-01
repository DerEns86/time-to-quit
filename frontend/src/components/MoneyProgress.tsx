import {Box, Paper} from "@mui/material";
import {getNotSmokedCigarettes, savedMoney, savedMoneyInAYear} from "../utilities/cigaretteUtilities.ts";
import {githubUser} from "../model/userModel.ts";

export default function MoneyProgress({ user } : Readonly<{ user: githubUser }>) {
    return (
        <>
            <h4>Statistiken</h4>
            <Paper>
                <Box>
                    <p>Seit dem Rauchstopp hast du <strong>{getNotSmokedCigarettes(user)}</strong> Zigaretten
                        nicht geraucht</p>
                    <p>Du hast <strong>{savedMoney(user).toFixed(2)}</strong>€ gespart</p>
                </Box>
            </Paper>
            <Paper>
                <p>In einem Jahr wirst du <strong>{savedMoneyInAYear(user).toFixed(2)}</strong> gespart haben</p>
            </Paper>
        </>
    )
}