import {useEffect, useState} from 'react'
import { Button } from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import axios from "axios";


function App() {
    const [user, setUser] = useState()

    useEffect(() => {
        loadUser();
    }, []);


    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080": window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")

    }

    const loadUser = () => {
        axios.get("/api/users/me")
            .then(response => {
                setUser(response.data)
                console.log(response.data)
            })
    }


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
      <h1>Vite + React</h1>

        <p>{user}</p>

        <Button variant="outlined" onClick={login}>
          Login
        </Button>
        <Button variant="outlined" onClick={loadUser}>
          Me
        </Button>

    </>
  )
}

export default App
