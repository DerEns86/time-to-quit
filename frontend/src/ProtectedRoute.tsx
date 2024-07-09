import {Navigate, Outlet} from "react-router-dom";
import {githubUser} from "./model/userModel.ts";
import Navbar from "./components/shared/Navbar.tsx";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect, useState} from "react";

type ProtectedRouteProps = {
    user: githubUser | null | undefined;
}

export default function ProtectedRoute(props: Readonly<ProtectedRouteProps>) {
    const isAuthenticated = props.user !== undefined && props.user !== null;
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (props.user === undefined) {
            handleOpen();

        }else handleClose();
    }, [props.user]);

    if (props.user === undefined) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }


    return isAuthenticated ? (<>
            <Outlet/>
            <Navbar />
        </>
    ) : <Navigate to="/"/>

}