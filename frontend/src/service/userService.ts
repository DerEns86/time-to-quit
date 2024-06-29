
import axios from 'axios';
import { GoalDTO } from "../model/goal.ts";
import {githubUser} from "../model/userModel.ts";


export function loadGoals(userId: string) {
    return axios.get(`api/users/${userId}/goals`);
}

export function addGoal(goal: GoalDTO, userId: string) {
    return axios.post(`api/users/${userId}/goals`, goal);
}

export function updateGoal(goal: GoalDTO, userId: string, goalId: string) {
    return axios.put(`api/users/${userId}/${goalId}`, goal);
}

export function updateUser(user: githubUser, userId: string) {
    return axios.put(`api/users/${userId}`, user);
}