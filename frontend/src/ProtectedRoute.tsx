import {Navigate, Outlet} from "react-router-dom";
import {githubUser} from "./model/userModel.ts";
import Navbar from "./components/shared/Navbar.tsx";

type ProtectedRouteProps = {
    user: githubUser | null | undefined;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const isAuthenticated = props.user !== undefined && props.user !== null;

    if (props.user === undefined) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? (<>
            <Outlet/>
            <Navbar />
        </>
    ) : <Navigate to="/"/>

}