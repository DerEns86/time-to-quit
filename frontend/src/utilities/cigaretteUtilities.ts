import { githubUser} from "../model/userModel.ts";


export  function getNotSmokedCigarettes( user: githubUser | null | undefined ) {
    if (user?.quitDate) {
        const quitDate = new Date(user.quitDate);
        const today = new Date();
        const diff = today.getTime() - quitDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return days * user.dailySmokedCigarettes;
    }
    return 0;
}

export  function savedMoney( user: githubUser | null | undefined ) {
    return getNotSmokedCigarettes(user) * 0.35;
}