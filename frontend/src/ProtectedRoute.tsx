import {Navigate, Outlet} from "react-router-dom";
import {githubUser} from "./model/userModel.ts";

type ProtectedRouteProps = {
    user: githubUser | null | undefined;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const isAuthenticated = props.user !== undefined && props.user !== null;

    return(
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}