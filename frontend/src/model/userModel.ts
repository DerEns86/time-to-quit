import {Goal} from "./goal.ts";

export type githubUser = {
    id: string;
    githubId: string;
    username: string;
    dailySmokedCigarettes: number;
    mainMotivation: string[];
    quitDate: string;
    avatar_url: string;
    goals: Goal[];

}