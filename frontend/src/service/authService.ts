import axios from "axios";
import {githubUser} from "../model/userModel.ts";


export function loadUser(): Promise<githubUser | null> {
    return axios.get("/api/auth/me")
        .then(response => {
            return response.data || null;
        }).catch(() => {
            return null;
        });
}


export function login() {
    const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
    window.open(host + "/oauth2/authorization/github", "_self")
}

export function logout() {
    const host =
        window.location.host === "localhost:5173"
            ? "http://localhost:8080"
            : window.location.origin;

    window.open(host + "/logout", "_self");
}