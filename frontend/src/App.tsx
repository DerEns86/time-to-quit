import { useEffect, useState } from 'react'
import { Container} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login.tsx";
import axios from "axios";
import { githubUser } from "./model/userModel.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import Header from "./components/shared/Header.tsx";


function App() {
    const [user, setUser] = useState<githubUser | null | undefined>(undefined)
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
        console.log(user);
    }, []);


    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")

    }

    function logout() {
        const host =
            window.location.host === "localhost:5173"
                ? "http://localhost:8080"
                : window.location.origin;

        window.open(host + "/logout", "_self");
    }

    const loadUser = () => {
        axios.get("/api/auth/me")
            .then(response => {
                setUser(response.data || null);
                console.log(response.data);
                if (!response.data) {
                    navigate("/");
                } else {
                    navigate("/home");
                }
            }).catch(() => {
            setUser(null);
            navigate("/")
        })
    }


    return (
        <Container disableGutters>
            <Header user={user} logout={logout}/>

            <Container >
            <Routes>
                <Route path="/" element={<Login user={user} login={login}/>}/>

                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path="/home" element={<Home user={user}/>}/>
                    {/*<Route path="/:id" element={<Home user={user}/>}/>*/}
                </Route>
            </Routes>

            </Container>

        </Container>
    )
}

export default App
