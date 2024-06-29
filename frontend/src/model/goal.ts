export type Goal = {
    goalId: string;
    goalName: string;
    goalPrice: number;
    isCompleted: boolean;
    appUserId: string;
}

export type GoalDTO = {
    goalName: string;
    goalPrice: number;
}