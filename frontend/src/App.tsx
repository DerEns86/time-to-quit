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
import {loadGoals, deleteGoal} from "./service/userService";



function App() {
    const [user, setUser] = useState<githubUser | null | undefined>(undefined)
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isTracking, setIsTracking] = useState<boolean>(false);
    const navigate = useNavigate();

    const addGoal = (newGoal: Goal) => {
        setGoals(prevGoals => [...prevGoals, newGoal]);
    };

    const deleteSingleGoal =  async (goalId: string) => {
        if (user?.id) {
            await deleteGoal(user.id, goalId);
            const updatedGoals = goals.filter(goal => goal.goalId !== goalId);
            setGoals(updatedGoals);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await loadUser();
            setUser(user);
            console.log(user);
            if (user) {
                const response = await loadGoals(user.id);
                setGoals(response.data);
            } else {
                navigate("/login");
            }
        };
        fetchData();
    }, [navigate, isTracking]);


return (
    <>
        <Header user={user} logout={logout}/>

        <Routes>
            <Route path="/login" element={<Login user={user} login={login}/>}/>

            <Route element={<ProtectedRoute user={user}/>}>
                <Route path="/" element={<Home user={user} goals={goals} isTracking={isTracking} setIsTracking={setIsTracking}/>}/>
                <Route path="/goals" element={<Goals user={user} goals={goals} addGoal={addGoal} deleteGoal={deleteSingleGoal}/>}/>
            </Route>
        </Routes>
    </>
)
}

export default App
