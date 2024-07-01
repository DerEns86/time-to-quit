
import axios from 'axios';
import { GoalDTO } from "../model/goal.ts";
import {githubUser, UserDTO} from "../model/userModel.ts";


export function loadGoals(userId: string) {
    return axios.get(`api/users/${userId}/goals`);
}

export function addGoal(goal: GoalDTO, userId: string) {
    return axios.post(`api/users/${userId}/goals`, goal);
}

export function deleteGoal(userId: string, goalId: string) {
    return axios.delete(`api/users/${userId}/${goalId}`);
}

export function updateGoal(goal: GoalDTO, userId: string, goalId: string) {
    return axios.put(`api/users/${userId}/${goalId}`, goal);
}

export function updateUser(user: UserDTO, userId: string) {
    return axios.put(`api/users/${userId}`, user);
}

export async function updateUserMotivation(user: githubUser, newMotivation: string[]) {
    const updatedUser: UserDTO = {
        dailySmokedCigarettes: user.dailySmokedCigarettes,
        mainMotivation: newMotivation,
        quitDate: user.quitDate,
        goals: user.goals
    };
    try {
        await updateUser(updatedUser, user.id);
        console.log('User updated', updatedUser);
    } catch (error) {
        console.error('Error updating user', error);
    }
}