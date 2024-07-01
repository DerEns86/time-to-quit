
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

export async function startTracking(user : githubUser, cigarettes: number){
    const updatedUser: UserDTO = {
        dailySmokedCigarettes: cigarettes,
        mainMotivation: user.mainMotivation,
        quitDate: new Date().toISOString(),
        goals: user.goals
    };

        try{
           await updateUser(updatedUser, user.id)
              console.log('User updated', updatedUser);
        } catch (error) {
            console.error('Error updating user', error);
        }
}

export async function stopTracking(user: githubUser) {
    const updatedUser: UserDTO = {
        dailySmokedCigarettes: 0,
        mainMotivation: user.mainMotivation,
        quitDate: null,
        goals: user.goals
    };
    try {
        const response = await updateUser(updatedUser, user.id);
        console.log('User updated', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error; // re-throw the error to be handled by the caller
    }
}

export async function updateUserMotivation(user: githubUser, newMotivation: string[]): Promise<githubUser> {
    const updatedUser: UserDTO = {
        dailySmokedCigarettes: user.dailySmokedCigarettes,
        mainMotivation: newMotivation,
        quitDate: user.quitDate,
        goals: user.goals
    };
    try {
        const response = await updateUser(updatedUser, user.id);
        console.log('User updated', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error; // re-throw the error to be handled by the caller
    }
}