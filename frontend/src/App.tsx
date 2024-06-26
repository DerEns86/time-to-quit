import {useEffect, useState} from 'react'
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login.tsx";
import {githubUser} from "./model/userModel.ts";
import { login, logout, loadUser } from "./service/authService.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import Header from "./components/shared/Header.tsx";


function App() {
    const [user, setUser] = useState<githubUser | null | undefined>(undefined)
    const navigate = useNavigate();

    useEffect(() => {
        loadUser().then(user => {
            setUser(user);
            console.log(user);
            if (!user) {
                navigate("/");
            } else {
                navigate("/home");
            }
        });
    }, []);


    return (
        <>
            <Header user={user} logout={logout}/>

            <Routes>
                <Route path="/" element={<Login user={user} login={login}/>}/>

                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path="/home" element={<Home user={user}/>}/>
                    {/*<Route path="/:id" element={<Home user={user}/>}/>*/}
                </Route>
            </Routes>
        </>
    )
}

export default App
