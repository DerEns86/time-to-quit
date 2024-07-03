import { Typography } from "@mui/material";
import {getNotSmokedCigarettes, savedMoney, savedMoneyInAYear} from "../utilities/cigaretteUtilities.ts";
import {githubUser} from "../model/userModel.ts";
import { StyledMoneyPaper } from "./styles";
import {useEffect} from "react";

type MoneyProgressProps = {
    user: githubUser;
    isTracking: boolean;
    setIsTracking: (active: boolean) => void;
};

export default function MoneyProgress({user, isTracking}: Readonly<MoneyProgressProps>) {

    useEffect(() => {

    }, [isTracking]);
    return (
        <section>
            {!isTracking ? <Typography variant={"subtitle1"} fontWeight={"bold"} className={'text-gray'}>Du hast noch kein Rauchstopp-Datum gesetzt</Typography>
                : (
                    <>
                        <Typography variant={"subtitle1"} fontWeight={"bold"} className={'text-gray'}>
                            Seit dem Rauchstopp:</Typography>
                        <StyledMoneyPaper variant={"elevation"} elevation={8}>
                                <Typography variant={"body1"}>Nicht gerauchte Zigaretten</Typography>
                                <Typography
                                    variant={"body1"}
                                    textAlign={"end"}
                                >
                                    <strong>{getNotSmokedCigarettes(user)}</strong>
                                </Typography>
                        </StyledMoneyPaper>
                        <StyledMoneyPaper variant={"elevation"} elevation={8}>

                            <Typography variant={"body1"}>Gespartes Geld</Typography>
                            <Typography
                                variant={"body1"}
                                textAlign={"end"}
                            >
                                <strong>{savedMoney(user).toFixed(2)}€</strong>
                            </Typography>
                        </StyledMoneyPaper>
                        <StyledMoneyPaper variant={"elevation"} elevation={8}>
                            <Typography variant={"body1"}>In einem Jahr gespart</Typography>
                            <Typography
                                variant={"body1"}
                                textAlign={"end"}
                            >
                                <strong>{savedMoneyInAYear(user).toFixed(2)}</strong>
                            </Typography>
                        </StyledMoneyPaper>
                    </>
                )
            }
        </section>
    )
}