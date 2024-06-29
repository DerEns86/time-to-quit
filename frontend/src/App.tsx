import {useEffect, useState} from 'react'
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login.tsx";
import {githubUser} from "./model/userModel.ts";
import {login, logout, loadUser} from "./service/authService.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import Header from "./components/shared/Header.tsx";
import Goals from "./pages/Goals.tsx";
import {Goal} from "./model/goal.ts";
import {loadGoals} from "./service/userService.ts";


function App() {
    const [user, setUser] = useState<githubUser | null | undefined>(undefined)
    const [goals, setGoals] = useState<Goal[]>([]);
    const navigate = useNavigate();

    const addGoal = (newGoal: Goal) => {
        setGoals(prevGoals => [...prevGoals, newGoal]);
    };

    useEffect(() => {
        loadUser().then(user => {
            setUser(user);
            console.log(user);
            if (user) {
                loadGoals(user.id).then(response => {
                    setGoals(response.data);
                    console.log(goals);
                });
            } else {
                navigate("/login");
            }
        });
    }, [navigate]);


return (
    <>
        <Header user={user} logout={logout}/>

        <Routes>
            <Route path="/login" element={<Login user={user} login={login}/>}/>

            <Route element={<ProtectedRoute user={user}/>}>
                <Route path="/" element={<Home user={user} goals={goals}/>}/>
                <Route path="/goals" element={<Goals user={user} goals={goals} addGoal={addGoal}/>}/>
            </Route>
        </Routes>
    </>
)
}

export default App
