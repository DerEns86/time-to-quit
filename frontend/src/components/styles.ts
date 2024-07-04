import { styled } from "@mui/system";
import { Paper} from "@mui/material";

const bgColor = 'rgba(26,115,232,0.8)';
const bgColorSecondary = 'rgba(68,170,68,0.8)';
const textColor = 'darkslategray';

export const StyledMoneyPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: bgColor,
    color: textColor,
    width: 'calc(100% - 32px)',
    maxWidth: '400px'

}));

export const StyledMotivationPaperNoActions = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: bgColorSecondary,
    color: textColor,
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',

}));

export const StyledMotivationPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2,0),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: bgColorSecondary,
    color: textColor,
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

}));

export const StyledGoalPaperNoActions = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1,2),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: bgColor,
    color: textColor,
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',

}));

export const StyledGoalPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1,0),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: bgColor,
    color: textColor,
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const StyledHealthPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2,),
        marginInline: '16px',
        marginBottom: theme.spacing(1.5),
    backgroundColor: bgColorSecondary,
    color: textColor,
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
}));