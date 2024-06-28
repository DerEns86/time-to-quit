
import axios from 'axios';
import { GoalDTO } from "../model/goal.ts";


export function addGoal(goal: GoalDTO, userId: string) {
    return axios.post(`api/users/${userId}/goals`, goal);
}