import {useEffect, useState} from 'react'
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login.tsx";
import {githubUser} from "./model/userModel.ts";
import { login, logout, loadUser } from "./service/authService.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import Header from "./components/shared/Header.tsx";
import Goals from "./pages/Goals.tsx";


function App() {
    const [user, setUser] = useState<githubUser | null | undefined>(undefined)
    const navigate = useNavigate();

    useEffect(() => {
        loadUser().then(user => {
            setUser(user);
            console.log(user);
            if (!user) {
                navigate("/login");
            }
        });
    }, []);


    return (
        <>
            <Header user={user} logout={logout}/>

            <Routes>
                <Route path="/login" element={<Login user={user} login={login}/>}/>

                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path="/" element={<Home user={user}/>}/>
                    <Route path="/goals" element={<Goals user={user}/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
